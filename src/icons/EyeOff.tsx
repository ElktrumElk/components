interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function EyeOff({ size = 24, color = "currentColor", className }: IconProps) {
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
        d="M17.94 17.94C16.23 19.28 14.15 20.03 12 20.03C8.08 20.03 4.82 17.57 3 12C3.91 9.16 5.62 6.79 7.94 5.06"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.12 14.12C13.65 14.59 12.85 14.87 12 14.87C10.62 14.87 9.5 13.75 9.5 12.37C9.5 11.52 9.78 10.72 10.25 10.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1L23 23"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.88 5.09C10.25 5.03 10.63 5 11 5C14.92 5 18.18 7.46 20 12C19.39 13.41 18.56 14.66 17.53 15.69"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
