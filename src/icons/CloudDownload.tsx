interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function CloudDownload({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M18 10a6 6 0 0 0-11.46-2.46" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 18a4 4 0 0 1-.58-7.97A6 6 0 0 1 18 10h.5A3.5 3.5 0 0 1 18 18H6Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="13" x2="12" y2="19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="9,17 12,20 15,17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
