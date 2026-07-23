interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Bug({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 21H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 8C20 8 21 10 21 12C21 13 20 14 20 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 8C4 8 3 10 3 12C3 13 4 14 4 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 4H16.5C15.5717 4 14.6815 4.36875 14.0251 5.02513C13.3688 5.6815 13 6.57174 13 7.5V14H11V7.5C11 6.57174 10.6313 5.6815 9.97487 5.02513C9.3185 4.36875 8.42826 4 7.5 4H6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 14C6 14 6.5 10 12 10C17.5 10 18 14 18 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
