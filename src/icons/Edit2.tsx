interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Edit2({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 20H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 3.50001C16.8978 3.10218 17.4374 2.87868 18 2.87868C18.5626 2.87868 19.1022 3.10218 19.5 3.50001C19.8978 3.89783 20.1213 4.43743 20.1213 5.00001C20.1213 5.56259 19.8978 6.10217 19.5 6.50001L7.5 18.5L3 21L5.5 16.5L16.5 3.50001Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
