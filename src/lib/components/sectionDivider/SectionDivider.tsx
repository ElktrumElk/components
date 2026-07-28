import { useRef, useEffect } from "react";
import { _SectionDivider, type SectionDividerProp } from "./SectionDividerClass";

export default function SectionDivider({ ...a }: SectionDividerProp) {
  const ref = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const controller = new _SectionDivider(a);
    if (ref.current) controller.init(ref.current);
    if (a.onFunc) a.onFunc(controller);
    return () => controller.destroy();
  }, [a.variant, a.amplitude, a.frequency, a.duration]);

  const variant = a.variant ?? "wave";
  const color = a.color ?? "#e2e8f0";
  const fillColor = a.fillColor ?? color;
  const isFilled = ["wave", "curl", "tilde", "heart", "leaf", "curve", "loop", "scroll"].includes(variant);

  return (
    <svg
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
      <path
        ref={ref}
        d={variant === "wave" ? "M0,32 C160,80 320,0 480,32 C640,64 800,16 960,32 C1120,48 1280,16 1440,32 L1440,0 L0,0 Z" : "M0,32 C160,80 320,0 480,32 C640,64 800,16 960,32 C1120,48 1280,16 1440,32 L1440,0 L0,0 Z"}
        fill={isFilled ? fillColor : "none"}
        stroke={!isFilled ? color : undefined}
        strokeWidth={!isFilled ? a.strokeWidth ?? 2 : undefined}
        style={{ transition: "fill 0.3s, stroke 0.3s" }}
      />
    </svg>
  );
}
