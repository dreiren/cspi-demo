type GlowNodeProps = {
  x: number;
  y: number;
  size?: number;
  tone?: "accent" | "secondary" | "white";
  delay?: number;
  animate?: boolean;
};

const toneColors: Record<NonNullable<GlowNodeProps["tone"]>, string> = {
  accent: "#69cddf",
  secondary: "#46a0b9",
  white: "#ffffff",
};

/**
 * A single network node: a glowing dot representing a connection point in
 * the technology ecosystem (server, device, data point, location, etc).
 */
export function GlowNode({ x, y, size = 5, tone = "accent", delay = 0, animate = true }: GlowNodeProps) {
  const color = toneColors[tone];

  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={size * 2.4} fill={color} opacity={0.12} />
      <circle
        r={size}
        fill={color}
        style={
          animate
            ? {
                animation: "node-pulse 3.2s ease-in-out infinite",
                animationDelay: `${delay}s`,
                transformOrigin: "center",
                transformBox: "fill-box",
              }
            : undefined
        }
      />
    </g>
  );
}
