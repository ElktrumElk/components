interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  fill?: boolean;
  fillColor?: string;
}

export default function Rows({ size = 24, color = "currentColor", className, fill: _fill = false, fillColor: _fillColor }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="3" width="18" height="7.5" rx="1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="13.5" width="18" height="7.5" rx="1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
