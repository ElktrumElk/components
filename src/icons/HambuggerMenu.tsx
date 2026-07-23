import React from 'react';

interface MenuIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function HambuggerMenu({ size = 24, strokeWidth = 2, ...props }: MenuIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Three balanced horizontal lines */}
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6"  x2="20" y2="6"  />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}
