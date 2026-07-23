interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Key({ size = 24, color = "currentColor", className }: IconProps) {
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
        d="M21 2L19 4M11.39 5.61C12.38 6.6 12.38 8.21 11.39 9.2C10.4 10.19 8.79 10.19 7.8 9.2C6.81 8.21 6.81 6.6 7.8 5.61C8.79 4.62 10.4 4.62 11.39 5.61Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 10L3 12L10 19L12 17L5 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 13.5L14.5 17.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 22L19.07 16.93C20.22 15.78 20.22 13.92 19.07 12.77L18.02 11.72C16.87 10.57 15.01 10.57 13.86 11.72L10.35 15.23"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
