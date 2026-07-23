interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Home({ size = 24, color = "currentColor", className }: IconProps) {
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
        d="M3 12L12 3L21 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 10V19C5 19.5523 5.44772 20 6 20H10V15C10 14.4477 10.4477 14 11 14H13C13.5523 14 14 14.4477 14 15V20H18C18.5523 20 19 19.5523 19 19V10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
