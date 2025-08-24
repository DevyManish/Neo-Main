import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <GlassCard>
        <div className="flex flex-col space-y-2.5">
          <h2 className="pb-6">Create Sprint Session</h2>
          <div className="flex flex-col items-center justify-end space-y-3 ">
            <Input type="text" placeholder="enter meeting id" />
            <Button>Create</Button>
          </div>
        </div>
      </GlassCard>{" "}
    </div>
  );
};

export default page;
