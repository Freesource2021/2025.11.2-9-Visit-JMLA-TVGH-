
import React from 'react';

const TrainIcon: React.FC = () => {
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
      className="h-6 w-6 text-blue-500"
      aria-hidden="true"
    >
      <path d="M10 4h4" />
      <path d="M10 20h4" />
      <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
      <path d="M6 12h12" />
      <path d="M10 16h4" />
      <path d="m14 4-2-2-2 2" />
      <path d="m14 20-2 2-2-2" />
    </svg>
  );
};

export default TrainIcon;
