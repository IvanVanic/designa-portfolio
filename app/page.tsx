import type { Metadata } from "next";
import DesignaPortfolioClient from "@/components/home/designa-portfolio-client";

export const metadata: Metadata = {
  title: "Designa",
  description: "Designa - Portfolio",
};

export default function Home() {
  return <DesignaPortfolioClient />;
}
