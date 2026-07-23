interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Power({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 2V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.36 6.64C19.6186 7.89879 20.4753 9.50244 20.8223 11.2482C21.1693 12.9939 20.9909 14.8034 20.3096 16.4478C19.6284 18.0921 18.4748 19.4976 16.9948 20.4864C15.5148 21.4752 13.7749 22.0029 12 22.0029C10.2251 22.0029 8.48523 21.4752 7.00523 20.4864C5.52523 19.4976 4.37164 18.0921 3.69038 16.4478C3.00912 14.8034 2.83074 12.9939 3.17773 11.2482C3.52472 9.50244 4.38143 7.89879 5.64 6.64" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
