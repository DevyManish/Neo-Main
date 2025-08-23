"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { data: session, status } = useSession();
  const trpc = useTRPC();

  // Move useMutation to the top level - before any conditional logic
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

  // Conditional rendering AFTER all hooks
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen p-8">
      <div className="font-semibold text-2xl">Projects</div>

      <div className="flex-1 bg-yellow-400 my-8">Content</div>

      <div className="flex gap-4">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your message"
        />
        <Button
          disabled={createProject.isPending}
          onClick={() => createProject.mutate({ value: value })}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Page;
