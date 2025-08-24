"use client";

import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Plus,
  ChevronDown,
  ChevronUp,
  Hammer,
  Users,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Meeting {
  id: string;
  meetId: string;
  botId: string;
  userId: string;
  status: string;
  constructedUrl: string | null;
  startTime: string | null;
  endTime: string | null;
  summary?: string; // Made optional since it's not in your API response
  createdAt: string;
  updatedAt: string;
}

const MeetingCard = ({
  meeting,
  onBuild,
}: {
  meeting: Meeting;
  onBuild: (summary: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const parseSummary = (summary: string) => {
    const meetingSummaryMatch = summary?.match(
      /<meetingsummary>(.*?)<\/meetingsummary>/
    );
    const todoMatch = summary?.match(/<todo>(.*?)<\/todo>/);

    return {
      meetingSummary: meetingSummaryMatch
        ? meetingSummaryMatch[1].trim()
        : summary,
      todos: todoMatch ? todoMatch[1].trim() : "",
    };
  };

  const { meetingSummary, todos } = parseSummary(meeting.summary!);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-400/20 border-green-400/30";
      case "completed":
        return "text-blue-400 bg-blue-400/20 border-blue-400/30";
      case "pending":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/30";
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/30";
    }
  };

  return (
    <GlassCard className="group hover:bg-white/10 transition-all duration-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Meeting #{meeting.meetId}
              </h3>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Clock className="w-4 h-4" />
                {formatDate(meeting.createdAt)}
              </div>
            </div>
          </div>

          <div
            className={`px-2 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${getStatusColor(
              meeting.status
            )}`}
          >
            {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
          </div>
        </div>

        {/* Summary Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-white/80 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-cyan-400" />
              Meeting Summary
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 h-6 px-2"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="text-sm text-white/70">
            {isExpanded ? (
              <div className="space-y-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="leading-relaxed">{meetingSummary}</p>
                </div>
                {todos && (
                  <div className="border-t border-white/10 pt-3">
                    <h5 className="text-xs font-medium text-white/60 mb-2 uppercase tracking-wide">
                      Action Items
                    </h5>
                    <p className="text-white/70">
                      {todos || "No specific action items identified."}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="line-clamp-2 leading-relaxed">
                {meetingSummary?.length > 120
                  ? `${meetingSummary?.slice(0, 120)}...`
                  : meetingSummary}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="text-xs text-white/50">Bot ID: {meeting.botId}</div>
          <Button
            onClick={() => onBuild(meetingSummary)}
            className="bg-gradient-to-r from-cyan-500/80 to-blue-600/80 hover:from-cyan-600/80 hover:to-blue-700/80 text-white px-4 py-2 text-sm font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-200"
          >
            <Hammer className="w-4 h-4 mr-2" />
            Build
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};

const Page = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
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
    const fetchMeetings = async () => {
      try {
        const res = await fetch("/api/meeting");
        const data = await res.json();
        console.log("API Response:", data); // Debug log

        // Handle different response formats
        if (data.success === true && Array.isArray(data.data)) {
          // When success is true and data is an array
          setMeetings(data.data);
        } else if (data.success === false && data.data) {
          // When success is false and data is a single object
          setMeetings([data.data]);
        } else if (data.meetings && Array.isArray(data.meetings)) {
          // Fallback for meetings array format
          setMeetings(data.meetings);
        } else {
          // No meetings found
          setMeetings([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch meetings");
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  const handleBuild = (summary: string) => {
    createProject.mutate({ value: summary });
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
            Sprint Meetings
          </h1>
          <p className="text-white/70">
            Review meeting summaries and turn discussions into actionable
            projects
          </p>
        </div>

        <GlassCard>
          <div className="flex justify-between items-center mb-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Meeting History
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Meeting
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-white flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                Loading meetings...
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {meetings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white/60" />
                  </div>
                  <p className="text-white/60 font-medium mb-2">
                    No meetings found
                  </p>
                  <p className="text-white/40 text-sm">
                    Start your first sprint meeting to see summaries here
                  </p>
                </div>
              ) : (
                meetings.map((meeting) => (
                  <MeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    onBuild={handleBuild}
                  />
                ))
              )}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default Page;
