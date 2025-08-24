import { SprintCard } from "@/components/sprint-card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import Link from "next/link";

export const Sprint = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-4 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          Sprints & Meetings
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Link href="/sprints/create">
          <SprintCard title="Sprint Planning" date="Today, 2:00 PM" />
        </Link>
        <SprintCard title="Daily Standup" date="Tomorrow, 9:00 AM" />
        <Link href="/sprints">
          <SprintCard title="Sprint Review" date="Friday, 3:00 PM" />
        </Link>
      </div>
    </div>
  );
};
