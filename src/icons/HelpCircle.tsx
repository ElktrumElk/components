interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function HelpCircle({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.09 9C9.33 8.64 9.64 8.35 10 8.14C10.35 7.93 10.76 7.82 11.17 7.82C11.96 7.82 12.6 8.46 12.6 9.25V9.59"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="16" r="1" fill={color} />
    </svg>
  );
}
