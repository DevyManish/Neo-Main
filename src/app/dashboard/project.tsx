import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Folder, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Project = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Folder className="w-5 h-5 text-cyan-400" />
          Projects
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.length === 0 ? (
            <div className="text-white col-span-full">No projects found.</div>
          ) : (
            projects.map((project) => (
              <Link href={"project/" + project.id}>
                <ProjectCard
                  key={project.id}
                  title={project.title || project.name}
                />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};
