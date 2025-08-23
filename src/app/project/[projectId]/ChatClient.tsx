"use client";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Code,
  Eye,
  Calendar,
  MessageCircle,
  Maximize2,
  Minimize2,
} from "lucide-react";

type Message = {
  id: string;
  role: string;
  type: string;
  content: string;
  fragement?: {
    sandboxUrl: string;
    title: string;
  };
};

type Project = {
  id: string;
  name: string;
  createdAt: string;
  messages: Message[];
};

export default function ChatClient({ project }: { project: Project }) {
  const [messages, setMessages] = useState<Message[]>(project.messages || []);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [selectedFragment, setSelectedFragment] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setSending(true);
    const userMsg: Message = {
      id: Math.random().toString(36),
      role: "user",
      type: "RESULT",
      content: input,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response with typing effect
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36),
          role: "assistant",
          type: "RESULT",
          content: `I understand you said "${userMsg.content}". Let me help you with that!`,
          fragement:
            Math.random() > 0.5
              ? {
                  sandboxUrl: "https://codesandbox.io/embed/sample",
                  title: "Generated Code Sample",
                }
              : undefined,
        },
      ]);
      setSending(false);
    }, 800);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Panel: Chat */}
      <div
        className={`flex flex-col transition-all duration-300 ${
          isPreviewExpanded ? "w-full md:w-1/3" : "w-full md:w-1/2"
        } backdrop-blur-xl bg-white/5 border-r border-white/10`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 backdrop-blur-xl bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Code className="w-6 h-6 text-cyan-400" />
                {project.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-white/70 mt-1">
                <Calendar className="w-4 h-4" />
                Created {formatDate(project.createdAt)}
                <span className="mx-2">•</span>
                <MessageCircle className="w-4 h-4" />
                {messages.length} messages
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/60">
              <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2 text-white/80">
                Start a conversation
              </p>
              <p className="text-sm text-center max-w-sm text-white/60">
                Ask questions about your project or request code changes. I'll
                help you build amazing things!
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-in slide-in-from-bottom-4 duration-300`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl border ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-cyan-500/80 to-blue-600/80 text-white border-cyan-400/30"
                        : "bg-white/10 border-white/20 text-white"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        AI Assistant
                      </div>
                    )}

                    <div className="prose prose-sm max-w-none">
                      <p className="mb-0 leading-relaxed">
                        {message.content
                          .replace("<task_summary>", "")
                          .replace("</task_summary>", "")}
                      </p>
                    </div>

                    {message.fragement && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <button
                          className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-all hover:scale-105 backdrop-blur-sm ${
                            message.role === "user"
                              ? "bg-white/20 text-white hover:bg-white/30 border border-white/20"
                              : "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/30"
                          }`}
                          onClick={() =>
                            setSelectedFragment({
                              url: message.fragement!.sandboxUrl,
                              title: message.fragement!.title,
                            })
                          }
                        >
                          <Eye className="w-4 h-4" />
                          {message.fragement.title}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      AI Assistant is typing...
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 backdrop-blur-xl bg-white/5">
          <form
            className="flex gap-3 items-end"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="flex-1 relative">
              <textarea
                className="w-full px-4 py-3 pr-12 border border-white/20 rounded-xl 
                         backdrop-blur-sm bg-white/10 text-white
                         placeholder-white/50
                         focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
                         resize-none transition-all duration-200
                         min-h-[48px] max-h-32"
                placeholder="Ask me anything about your project..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={sending}
                rows={1}
                style={{
                  height: "auto",
                  minHeight: "48px",
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height =
                    Math.min(target.scrollHeight, 128) + "px";
                }}
              />
            </div>
            <button
              type="submit"
              className={`p-3 rounded-xl transition-all duration-200 backdrop-blur-sm border
                       ${
                         sending || !input.trim()
                           ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
                           : "bg-gradient-to-r from-cyan-500/80 to-blue-600/80 hover:from-cyan-600/80 hover:to-blue-700/80 text-white shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 border-cyan-400/30"
                       }`}
              disabled={sending || !input.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div
        className={`hidden md:flex flex-col transition-all duration-300 ${
          isPreviewExpanded ? "w-2/3" : "w-1/2"
        } backdrop-blur-xl bg-white/5`}
      >
        {selectedFragment ? (
          <>
            <div className="flex items-center justify-between p-4 border-b border-white/10 backdrop-blur-xl bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="font-semibold text-white">
                  {selectedFragment.title}
                </h3>
              </div>
              <button
                onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                className="p-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10 backdrop-blur-sm"
              >
                {isPreviewExpanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex-1 bg-black/20 backdrop-blur-sm">
              <iframe
                src={selectedFragment.url}
                title={selectedFragment.title}
                className="w-full h-full border-none"
                allow="clipboard-write; clipboard-read;"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-white/50 backdrop-blur-xl">
            <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
              <Code className="w-12 h-12 text-white/60" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white/80">
              No Preview Selected
            </h3>
            <p className="text-center max-w-sm leading-relaxed text-white/60">
              Click on any sandbox link in the chat to view it here. Interactive
              previews will appear in this panel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
