interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function AlertTriangle({ size = 24, color = "currentColor", className }: IconProps) {
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
        d="M10.29 3.86L1.82 18C1.64 18.31 1.55 18.67 1.55 19.04C1.55 19.78 2.15 20.4 2.9 20.4H21.1C21.85 20.4 22.45 19.78 22.45 19.04C22.45 18.67 22.36 18.31 22.18 18L13.71 3.86C13.35 3.22 12.67 2.86 12 2.86C11.33 2.86 10.65 3.22 10.29 3.86Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="12"
        y1="9"
        x2="12"
        y2="13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="17" r="1" fill={color} />
    </svg>
  );
}
