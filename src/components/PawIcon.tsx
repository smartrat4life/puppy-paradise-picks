import React from 'react';

interface PawIconProps {
  className?: string;
}

const PawIcon: React.FC<PawIconProps> = ({ className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2.5c-3.5 0-6.5 2.5-6.5 5.5c0 1.5.5 3 1.5 4.5c-.5-.5-1-1-1.5-1.5c-1.5 1-3.5 2.5-3.5 4.5c0 3.5 3 6.5 6.5 6.5c3.5 0 6.5-3 6.5-6.5c0-2 1.5-3.5 3.5-4.5c.5.5 1 1 1.5 1.5c1-1.5 2-3 2-4.5c0-3-2.5-5.5-6.5-5.5zm-6.5 4.5c.5 0 1 .5 1 1c0 .5-.5 1-1 1c-.5 0-1-.5-1-1c0-.5.5-1 1-1z" />
  </svg>
);

export default PawIcon;
