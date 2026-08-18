type FlowLineProps = {
  d: string;
  tone?: "accent" | "secondary" | "white";
  animate?: boolean;
  width?: number;
  dashed?: boolean;
  opacity?: number;
};

const toneColors: Record<NonNullable<FlowLineProps["tone"]>, string> = {
  accent: "#69cddf",
  secondary: "#46a0b9",
  white: "#ffffff",
};

/**
 * A connection line between nodes. When `animate` is true, a dash pattern
 * flows along the path to represent data/traffic movement.
 */
export function FlowLine({ d, tone = "secondary", animate = true, width = 1.2, dashed = true, opacity = 0.55 }: FlowLineProps) {
  const color = toneColors[tone];

  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      opacity={opacity}
      strokeDasharray={dashed ? "6 10" : undefined}
      style={animate ? { animation: "dash-flow 18s linear infinite" } : undefined}
    />
  );
}
