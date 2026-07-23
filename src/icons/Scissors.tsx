interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Scissors({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="6" cy="6" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="1.5" />
      <path d="M20 4L8.12 15.88" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.47 14.48L20 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.12 8.12L12 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
