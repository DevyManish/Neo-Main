"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { GlassNavbar } from "@/components/ui/navbar-menu";
import LightRays from "@/components/ui/lightrays";
import { Plus, Calendar, Users, Folder } from "lucide-react";
import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/glass-card";
import { ProjectCard } from "@/components/project-card";
import { SprintCard } from "@/components/sprint-card";
import { Project } from "./project";
import { Sprint } from "./sprint";

const TeamMember = ({
  name,
  role = "Developer",
}: {
  name: string;
  role?: string;
}) => (
  <div className="flex items-center gap-3 py-2">
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
      <span className="text-white text-sm font-semibold">{name.charAt(0)}</span>
    </div>
    <div>
      <p className="text-white text-sm font-medium">{name}</p>
      <p className="text-white/60 text-xs">{role}</p>
    </div>
  </div>
);

const Page = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { data: session, status } = useSession();
  const trpc = useTRPC();

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (e) => {
        toast.error(e.message);
      },
      onSuccess: (data: { id: string }) => {
        router.push(`/project/${data.id}`);
      },
    })
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div
          className="px-6 py-3 rounded-lg"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* LightRays Background */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={1.2}
        lightSpread={0.6}
        rayLength={1.5}
        followMouse={true}
        mouseInfluence={0.08}
        noiseAmount={0.05}
        distortion={0.03}
        className="dashboard-rays"
      />

      {/* Glass Navbar */}
      <GlassNavbar />

      {/* Main Dashboard Content */}
      <div className="relative z-10 min-h-screen pt-20 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
              Welcome back, {session?.user?.name?.split(" ")[0] || "Developer"}
            </h1>
            <p className="text-white/70">
              Manage your projects and collaborate with your team
            </p>
          </div>

          {/* Start New Project Section */}
          <GlassCard className="mb-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                Start new project
              </h2>
              <div className="flex gap-4 flex-col sm:flex-row">
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter your instruction here.."
                  className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400/50 backdrop-blur-sm"
                />
                <Button
                  disabled={createProject.isPending}
                  onClick={() => createProject.mutate({ value: value })}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8"
                >
                  {createProject.isPending ? "Creating..." : "Submit"}
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Team Section */}
          <GlassCard className="mb-8">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-cyan-400" />
              Team
            </h2>
            <div className="space-y-1">
              <TeamMember name="Manish Gupta" role="You - Project Lead" />
              <TeamMember name="Pratyush Singha" role="Full Stack Developer" />
            </div>
          </GlassCard>
          <Project />
          <Sprint />
        </div>
      </div>
    </>
  );
};

export default Page;
