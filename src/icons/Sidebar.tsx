interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  fill?: boolean;
  fillColor?: string;
}

export default function Sidebar({ size = 24, color = "currentColor", className, fill: _fill = false, fillColor: _fillColor }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="9" y1="3" x2="9" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
