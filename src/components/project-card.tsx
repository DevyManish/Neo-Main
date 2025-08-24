import { GlassCard } from "./glass-card";
import { Folder } from "lucide-react";

export const ProjectCard = ({
  title = "Untitled Project",
  description = "Nextjs App for ....",
}: {
  title?: string;
  description?: string;
}) => (
  <GlassCard className="cursor-pointer hover:border-cyan-400/30">
    <div className="h-20 flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-2">
        <Folder className="w-4 h-4 text-cyan-400" />
        <h3 className="text-white font-medium text-sm truncate">{title}</h3>
      </div>
      <p className="text-white/60 text-xs line-clamp-2">{description}</p>
    </div>
  </GlassCard>
);
