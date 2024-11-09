"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [active, setActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, bottom } = containerRef.current.getBoundingClientRect();
      setActive(top < window.innerHeight && bottom > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    containerRef.current?.addEventListener("mousemove", handleMouseMove);
    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{
        perspective: "1000px",
      }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent blur-3xl"
          style={{
            clipPath: `circle(100px at ${mousePosition.x}px ${mousePosition.y}px)`,
            opacity: active ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
      </div>
      {children}
    </div>
  );
};
