import { prisma } from "@/lib/db";
import ChatClient from "./ChatClient";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await prisma.project.findUnique({
    where: { id: params.projectId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        include: { fragement: true },
      },
    },
  });

  if (!project) return notFound();

  return <ChatClient project={JSON.parse(JSON.stringify(project))} />;
}
