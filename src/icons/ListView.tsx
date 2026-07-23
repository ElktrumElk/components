interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function ListView({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 6H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 18H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="4" cy="6" r="1.5" fill={color} />
      <circle cx="4" cy="12" r="1.5" fill={color} />
      <circle cx="4" cy="18" r="1.5" fill={color} />
    </svg>
  );
}
