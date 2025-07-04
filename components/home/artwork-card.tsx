import Image from "next/image";
import { Artwork } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function ArtworkCard({ artwork, onSelect, className, style }: ArtworkCardProps) {
  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 ease-out hover:scale-105",
        "border-2 border-transparent hover:border-accent shadow-lg hover:shadow-2xl hover:shadow-accent/20",
        className
      )}
      onClick={() => onSelect(artwork)}
      style={style}
    >
      <Image
        src={artwork.image || "/placeholder.svg"}
        alt={artwork.title}
        width={400}
        height={300}
        className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 p-6 text-white">
        <Badge className="bg-accent/80 backdrop-blur-sm border-none text-accent-foreground text-xs font-semibold uppercase tracking-wider">
          {artwork.type}
        </Badge>
        <h3 className="mt-2 text-2xl font-bold font-sora text-shadow-md">{artwork.title}</h3>
      </div>
    </div>
  );
}
