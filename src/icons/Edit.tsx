interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Edit({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.49997C18.8978 2.10214 19.4374 1.87865 20 1.87865C20.5626 1.87865 21.1022 2.10214 21.5 2.49997C21.8978 2.89779 22.1213 3.43739 22.1213 3.99997C22.1213 4.56256 21.8978 5.10215 21.5 5.49997L12 15L8 16L9 12L18.5 2.49997Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
