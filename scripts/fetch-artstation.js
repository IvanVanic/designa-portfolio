/*
  ArtStation fetch script (unofficial)
  - Collects projects for a user
  - Downloads cover + sub images to public/gallery_artworks as image{index}_{n}.jpg
  - Writes normalized entries to data/artworks.json according to `types/Artwork`

  Usage:
    pnpm fetch:artstation --username pingini
    or
    node scripts/fetch-artstation.js pingini

  Note: This uses publicly available JSON endpoints. Review ArtStation TOS before use.
*/

const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

let REFERER = "";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          accept: "application/json, text/plain, */*",
          "user-agent": "designa-portfolio-bot/1.0",
          referer: REFERER || "https://www.artstation.com/",
          "x-requested-with": "XMLHttpRequest",
          "accept-language": "en-US,en;q=0.9",
          origin: "https://www.artstation.com",
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await sleep(500 * attempt);
    }
  }
}

function stripHtml(html) {
  if (!html) return "";
  return String(html)
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "designa-portfolio-bot/1.0",
      referer: REFERER || "https://www.artstation.com/",
      "accept-language": "en-US,en;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const arrayBuf = await res.arrayBuffer();
  await fsp.writeFile(destPath, Buffer.from(arrayBuf));
}

function normalizeImageUrl(asset) {
  // Prefer image_url; fall back to various fields
  return (
    asset?.image_url ||
    asset?.image ||
    asset?.url ||
    asset?.small_image_url ||
    asset?.thumb_url ||
    null
  );
}

async function getAllProjects(username) {
  const projects = [];
  let page = 1;
  while (true) {
    const url = `https://www.artstation.com/users/${encodeURIComponent(
      username
    )}/projects.json?page=${page}`;
    const json = await fetchJson(url);
    const pageData = json?.data || [];
    if (!pageData.length) break;
    projects.push(...pageData);
    page += 1;
    await sleep(150);
  }
  return projects;
}

async function getProjectDetails(hashId) {
  const url = `https://www.artstation.com/projects/${hashId}.json`;
  return fetchJson(url);
}

async function main() {
  const username =
    process.argv[2] && !process.argv[2].startsWith("--")
      ? process.argv[2]
      : process.env.ARTSTATION_USERNAME ||
        (process.argv.find((a) => a.startsWith("--username=")) || "").split("=")[1] ||
        "pingini";

  REFERER = `https://www.artstation.com/${username}`;
  const repoRoot = process.cwd();
  const imagesDir = path.join(repoRoot, "public", "gallery_artworks");
  const dataFile = path.join(repoRoot, "data", "artworks.json");

  await fsp.mkdir(imagesDir, { recursive: true });

  console.log(`Fetching projects for @${username}...`);
  const projects = await getAllProjects(username);
  if (!projects.length) {
    console.error("No projects found.");
    process.exit(1);
  }

  // Sort by published_at desc (newest first)
  projects.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  const artworks = [];
  let index = 1;

  for (const project of projects) {
    try {
      const details = await getProjectDetails(
        project.hash_id || project.id || project.permalink?.split("/").pop()
      );
      const assets = Array.isArray(details?.assets) ? details.assets : [];

      // Determine cover first
      let coverAsset = assets.find((a) => a?.has_image && (a.asset_type === "cover" || a.cover));
      if (!coverAsset) {
        coverAsset = assets.find((a) => a?.has_image && a.asset_type === "image") || assets[0];
      }
      const coverUrl = normalizeImageUrl(coverAsset) || details?.cover_url || details?.cover?.url;
      if (!coverUrl) {
        console.warn(`Skipping project without cover: ${details?.title || project.title}`);
        continue;
      }

      // Other images
      const imageAssets = assets.filter(
        (a) => a !== coverAsset && a?.has_image && (a.asset_type === "image" || a.type === "image")
      );
      const subImageUrls = imageAssets.map(normalizeImageUrl).filter(Boolean);

      // Download cover + subs
      const mainFilename = `image${index}_1.jpg`;
      const mainPath = path.join(imagesDir, mainFilename);
      await downloadImage(coverUrl, mainPath);

      const subImages = [];
      for (let i = 0; i < Math.min(subImageUrls.length, 6); i++) {
        const url = subImageUrls[i];
        const subName = `image${index}_${i + 2}.jpg`;
        await downloadImage(url, path.join(imagesDir, subName));
        subImages.push(`/gallery_artworks/${subName}`);
        await sleep(80);
      }

      // Build artwork entry
      const description = stripHtml(
        details?.description || details?.description_html || project?.description || ""
      );
      const tags = (details?.tags || project?.tags || []).slice(0, 3);
      // Extract tools/software - try multiple potential fields
      let tools = [];

      // Check various potential fields for tools/software
      if (Array.isArray(details?.software_items)) {
        tools = details.software_items
          .map((t) => (typeof t === "string" ? t : t?.name))
          .filter(Boolean);
      } else if (Array.isArray(details?.tools)) {
        tools = details.tools.map((t) => (typeof t === "string" ? t : t?.name)).filter(Boolean);
      } else if (Array.isArray(details?.software_used)) {
        tools = details.software_used
          .map((t) => (typeof t === "string" ? t : t?.name))
          .filter(Boolean);
      } else if (Array.isArray(details?.mediums_used)) {
        tools = details.mediums_used
          .map((t) => (typeof t === "string" ? t : t?.name))
          .filter(Boolean);
      }

      // Debug: log what we found
      console.log(`"${details?.title}" - Tools found:`, tools.length > 0 ? tools : "none");

      const software = tools.length ? tools : undefined;
      const artstationLink =
        details?.permalink ||
        `https://www.artstation.com/artwork/${details?.hash_id || project?.hash_id}`;

      artworks.push({
        id: index,
        title: details?.title || project.title || `Artwork ${index}`,
        type: details?.medium || project?.medium || "Illustration",
        image: `/gallery_artworks/${mainFilename}`,
        description,
        tags,
        software,
        artstationLink,
        subImages,
      });

      console.log(`Saved #${index}: ${artworks[artworks.length - 1].title}`);
      index += 1;
      await sleep(120);
    } catch (err) {
      console.warn("Failed project", project?.title || project?.id, err?.message);
    }
  }

  // Write JSON
  await fsp.writeFile(dataFile, JSON.stringify(artworks, null, 2) + "\n", "utf-8");
  console.log(`\nWrote ${artworks.length} artworks → ${path.relative(process.cwd(), dataFile)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
