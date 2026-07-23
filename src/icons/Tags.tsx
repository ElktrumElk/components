interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Tags({ size = 24, color = "currentColor", className }: IconProps) {
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
        d="M21.41 11.58L12.41 2.58C12.05 2.22 11.55 2 11.04 2H4C2.9 2 2 2.9 2 4V11.04C2 11.55 2.22 12.05 2.58 12.41L11.58 21.41C12.36 22.19 13.62 22.19 14.4 21.41L21.39 14.42C22.18 13.64 22.18 12.35 21.41 11.58Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="7"
        y1="7"
        x2="7.01"
        y2="7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="6.5"
        y1="18"
        x2="18"
        y2="6.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
