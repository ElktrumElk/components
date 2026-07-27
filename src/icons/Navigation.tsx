interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  fill?: boolean;
  fillColor?: string;
}

export default function Navigation({ size = 24, color = "currentColor", className, fill: _fill = false, fillColor: _fillColor }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 11L22 2L13 21L11 13L3 11Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
