interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function QrCode({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="5" y="5" width="3" height="3" fill={color} />
      <rect x="16" y="5" width="3" height="3" fill={color} />
      <rect x="5" y="16" width="3" height="3" fill={color} />
      <rect x="14" y="14" width="3" height="3" fill={color} />
      <rect x="18" y="14" width="3" height="3" fill={color} />
      <rect x="14" y="18" width="3" height="3" fill={color} />
      <rect x="18" y="18" width="3" height="3" fill={color} />
    </svg>
  );
}
