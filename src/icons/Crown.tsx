interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Crown({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M2 20h20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 17l3-10 4 5 5-7 4 5 3-1v10H3z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="7" r="1" fill={color} />
      <circle cx="12" cy="5" r="1" fill={color} />
      <circle cx="18" cy="7" r="1" fill={color} />
    </svg>
  );
}
