interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Reload({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M1 4V10H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.51 15C4.15839 16.8404 5.38734 18.4202 7.01166 19.5014C8.63598 20.5826 10.5677 21.1066 12.5157 20.9945C14.4637 20.8823 16.3226 20.1398 17.8121 18.8816C19.3017 17.6234 20.3413 15.9181 20.7742 14.0061C21.2072 12.0942 21.0101 10.0868 20.2126 8.28474C19.4152 6.48268 18.0605 4.98521 16.3528 4.02771C14.6451 3.07021 12.6769 2.70391 10.7447 2.98444C8.81245 3.26497 7.02091 4.17587 5.64 5.58L1 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 20V14H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.49 9C19.8416 7.15957 18.6127 5.57981 16.9883 4.49861C15.364 3.41742 13.4323 2.8934 11.4843 3.00546C9.53633 3.11753 7.67738 3.86007 6.18785 5.11825C4.69833 6.37644 3.65875 8.08175 3.22579 9.99375C2.79283 11.9057 2.98994 13.9131 3.78737 15.7152C4.5848 17.5173 5.93954 19.0148 7.64721 19.9723C9.35488 20.9298 11.3231 21.2961 13.2553 21.0156C15.1875 20.735 16.9791 19.8241 18.36 18.42L23 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
