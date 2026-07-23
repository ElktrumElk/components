interface ShareLogoProps {
  size?: number;
  className?: string;
}

export default function ShareLogo({ size = 40, className }: ShareLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#logoGrad)" />
      <path
        d="M24 14C24 14 28 18 28 22C28 22 32 18 36 16C36 16 32 22 28 26C28 26 32 30 36 34C36 34 30 32 26 28C26 28 24 34 24 34C24 34 22 28 22 28C22 28 18 32 14 34C14 34 18 30 22 26C22 26 18 22 14 16C14 16 18 18 22 22C22 22 18 18 24 14Z"
        fill="white"
        opacity="0.95"
      />
    </svg>
  );
}
