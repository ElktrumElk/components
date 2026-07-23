interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function ShieldOff({ size = 24, color = "currentColor", className }: IconProps) {
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
        d="M19.69 14.23L12 22L3 16V8C3 6.84 3.33 5.73 3.9 4.76L14.67 14.23C16.13 14.8 17.5 14.23 19.69 14.23Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 5L21 19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2L21 5V8C21 11.38 17.83 14.81 14.67 14.23"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
