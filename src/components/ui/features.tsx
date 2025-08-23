import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Features = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto flex flex-col gap-14">
      <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
        <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
          Our Features
        </h4>
        <Button className="gap-4">
          View all features <MoveRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
          <Image
            src="/feat1.jpg"
            alt="ai-coding-agent-img"
            height={326}
            width={200}
            className="w-82 h-42"
          />
          <h3 className="text-xl tracking-tight">AI Coding Agent</h3>
          <p className="text-muted-foreground text-base">
            Your autonomous coding teammate that can understand project goals,
            plan tasks, and write high-quality code in a secure sandbox
            environment.
          </p>
        </div>
        <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
          <Image
            src="/feat1.jpg"
            alt="ai-coding-agent-img"
            height={326}
            width={200}
            className="w-82 h-42"
          />
          <h3 className="text-xl tracking-tight">Smart Sprint Assistant</h3>
          <p className="text-muted-foreground text-base">
            Analyzes sprint meetings, extracts goals, and creates structured
            to-dos or tickets automatically — keeping the team aligned and
            saving hours of manual work.
          </p>
        </div>
        <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
          <Image
            src="/feat1.jpg"
            alt="ai-coding-agent-img"
            height={326}
            width={200}
            className="w-82 h-42"
          />
          <h3 className="text-xl tracking-tight">
            Automated Development Sandbox
          </h3>
          <p className="text-muted-foreground text-base">
            Every change is executed in an isolated sandbox, tested, and then
            pushed as a pull request to GitHub. Developers can review or approve
            instantly.
          </p>
        </div>
        <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
          <Image
            src="/feat1.jpg"
            alt="ai-coding-agent-img"
            height={326}
            width={200}
            className="w-82 h-42"
          />
          <h3 className="text-xl tracking-tight">Collaborative Control</h3>
          <p className="text-muted-foreground text-base">
            Team members can instruct the agent, review its progress, and see
            real-time updates of each sandbox run — ensuring full visibility and
            control.
          </p>
        </div>
      </div>
    </div>
  </div>
);
