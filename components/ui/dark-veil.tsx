import React from 'react';

interface DarkVeilProps {
  children: React.ReactNode;
  className?: string;
  opacity?: string;
}

export default function DarkVeil({ children, className = "", opacity = "bg-black/40" }: DarkVeilProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Dark veil overlay */}
      <div
        className={`absolute inset-0 ${opacity} backdrop-blur-sm z-10`}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}