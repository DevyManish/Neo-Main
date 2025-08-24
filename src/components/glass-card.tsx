import React from "react";

export const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${className}`}
    style={{
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
    }}
  >
    {children}
  </div>
);
