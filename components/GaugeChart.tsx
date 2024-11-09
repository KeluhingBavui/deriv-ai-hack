"use client"

import { useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground font-normal">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48">
          <canvas 
            ref={canvasRef} 
            width={300} 
            height={200}
            className="w-full h-full"
          />
        </div>
      </CardContent>
    </Card>
  );
} 