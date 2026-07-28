import { useRef, useEffect } from "react";
import { _SectionDivider, type SectionDividerProp } from "./SectionDividerClass";

const SSR_PATHS: Record<string, string> = {
  wave: "M0,32 C160,80 320,0 480,32 C640,64 800,16 960,32 C1120,48 1280,16 1440,32 L1440,120 L0,120 Z",
  curl: "M0,40 C80,10 120,70 200,40 C280,10 320,70 400,40 C480,10 520,70 600,40 C680,10 720,70 800,40 C880,10 920,70 1000,40 C1080,10 1120,70 1200,40 C1280,10 1320,70 1440,40 L1440,120 L0,120 Z",
  zigzag: "M0,0 L120,60 L240,0 L360,60 L480,0 L600,60 L720,0 L840,60 L960,0 L1080,60 L1200,0 L1320,60 L1440,0",
  dots: "M0,40 Q360,0 720,40 Q1080,80 1440,40",
  tilde: "M0,30 C120,60 240,0 360,30 C480,60 600,0 720,30 C840,60 960,0 1080,30 C1200,60 1320,0 1440,30 L1440,120 L0,120 Z",
  heart: "M0,50 C180,20 240,70 360,40 C480,10 540,60 720,40 C900,20 960,70 1080,40 C1200,10 1260,60 1440,40 L1440,120 L0,120 Z",
  diamond: "M0,40 L120,0 L240,40 L360,0 L480,40 L600,0 L720,40 L840,0 L960,40 L1080,0 L1200,40 L1320,0 L1440,40",
  leaf: "M0,50 C120,10 240,60 360,30 C480,0 600,50 720,30 C840,10 960,60 1080,30 C1200,0 1320,50 1440,30 L1440,120 L0,120 Z",
  curve: "M0,48 C240,80 480,0 720,48 C960,96 1200,0 1440,48 L1440,120 L0,120 Z",
  pulse: "M0,40 L200,40 L280,0 L360,80 L440,0 L520,80 L600,0 L680,40 L880,40 L1200,40 L1440,40",
  loop: "M0,40 C180,80 180,0 360,40 C540,80 540,0 720,40 C900,80 900,0 1080,40 C1260,80 1260,0 1440,40 L1440,120 L0,120 Z",
  scroll: "M0,50 C80,20 160,50 240,30 C320,10 400,50 480,30 C560,10 640,50 720,30 C800,10 880,50 960,30 C1040,10 1120,50 1200,30 C1280,10 1360,50 1440,30 L1440,120 L0,120 Z",
};

const FILLED = new Set(["wave", "curl", "tilde", "heart", "leaf", "curve", "loop", "scroll"]);

export default function SectionDivider({ ...a }: SectionDividerProp) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const instRef = useRef<_SectionDivider | null>(null);

  useEffect(() => {
    const inst = new _SectionDivider();
    instRef.current = inst;
    if (svgRef.current) inst.attach(svgRef.current);
    inst.update(a);
    if (a.onFunc) a.onFunc(inst);
    return () => inst.destroy();
  }, []);

  useEffect(() => {
    if (instRef.current) instRef.current.update(a);
  }, [a.animate, a.float, a.life, a.variant, a.amplitude, a.frequency, a.duration, a.delay, a.easing]);

  const variant = a.variant ?? "wave";
  const color = a.color ?? "#e2e8f0";
  const fillColor = a.fillColor ?? color;
  const isFilled = FILLED.has(variant);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1440 120"
      width={a.width ?? "100%"}
      height={a.height ?? 80}
      className={a.className}
      style={{
        display: "block",
        transform: a.flip ? "scaleY(-1)" : undefined,
        ...a.style,
      }}
      {...a.gest}
    >
      <g data-float="">
        <path
          d={SSR_PATHS[variant] || SSR_PATHS.wave}
          fill={isFilled ? fillColor : "none"}
          stroke={!isFilled ? color : undefined}
          strokeWidth={!isFilled ? (a.strokeWidth ?? 2) : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
