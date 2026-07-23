
export const UploadVideoIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => {
  return (
    <svg 
      xmlns="http://w3.org" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
      <polygon points="5 13 8 15 5 17 5 13" />
    </svg>
  );
};
