interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Image2({ size = 24, color = "currentColor", className }: IconProps) {
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
        d="M21 3H3v18h18V3z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 3l-10 10M3 3l7 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8"
        cy="8"
        r="1"
        fill={color}
      />
      <circle
        cx="16"
        cy="8"
        r="1"
        fill={color}
      />
      <circle
        cx="12"
        cy="12"
        r="1"
        fill={color}
      />
    </svg>
  );
}
