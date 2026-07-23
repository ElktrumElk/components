interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Tag({ size = 24, color = "currentColor", className }: IconProps) {
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
        d="M20.59 13.41L13.42 20.58C13.23 20.77 12.98 20.88 12.71 20.88C12.44 20.88 12.19 20.77 12 20.58L2 10.59V2H10.59L20.59 12C20.97 12.39 20.97 13.02 20.59 13.41Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="7"
        y1="7"
        x2="7.01"
        y2="7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
