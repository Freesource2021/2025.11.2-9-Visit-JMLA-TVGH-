
import React from 'react';

const WalkIcon: React.FC = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="h-6 w-6 text-emerald-500"
      aria-hidden="true"
    >
      <path d="M12 22c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4Z" />
      <path d="M20 13.7" />
      <path d="M4 14.5" />
      <path d="M15.5 8.5C15.5 5.5 13 3 10 3s-5.5 2.5-5.5 5.5" />
      <path d="M16.4 14.7L12 11l-4.4 3.7" />
    </svg>
  );
};

export default WalkIcon;
