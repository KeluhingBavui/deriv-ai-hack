"use client"

import { useEffect, useRef } from 'react';

interface GaugeChartProps {
  title: string;
  value: number;
  max: number;
  colors: [string, string, string]; // [good, medium, bad]
  unit?: string;
}

export function GaugeChart({ title, value, max, colors, unit = '%' }: GaugeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const percentage = (value / max) * 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up dimensions
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height * 0.6;
    const radius = Math.min(width, height) * 0.4;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#2a2a2a';
    ctx.stroke();

    // Create gradient for value arc
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, colors[2]);    // Bad (start)
    gradient.addColorStop(0.5, colors[1]);  // Medium (middle)
    gradient.addColorStop(1, colors[0]);    // Good (end)

    // Draw value arc
    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      radius,
      Math.PI,
      Math.PI + (percentage / 100) * Math.PI
    );
    ctx.lineWidth = 20;
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Draw value text
    ctx.font = 'bold 24px var(--font-geist-sans)';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(`${value}${unit}`, centerX, centerY + 50);

  }, [value, max, colors, unit]);

  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <h3 className="text-sm text-muted-foreground mb-4">{title}</h3>
      <div className="relative h-48">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={200}
          className="w-full h-full"
        />
      </div>
    </div>
  );
} 