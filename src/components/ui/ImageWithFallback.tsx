import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackIcon?: React.ReactNode;
  containerClassName?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackSrc = '/images/paw-placeholder.png', // Default fallback image
  fallbackIcon,
  containerClassName,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleError = () => {
    setError(true);
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  // If there's an error or no src, show fallback
  if (error || !src) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-amber-100 text-amber-800',
          className,
          containerClassName
        )}
      >
        {fallbackIcon || (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-1/2 h-1/2 text-amber-500"
          >
            <path d="M12 14a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
            <path 
              fillRule="evenodd" 
              d="M12 2C6.477 2 2 6.477 2 12c0 1.6.376 3.112 1.043 4.453.198.4.12.898-.148 1.24l-1.2 1.6a1 1 0 0 0 .8 1.6h2.01a8.5 8.5 0 0 0 15.01 0h2.01a1 1 0 0 0 .8-1.6l-1.2-1.6a1.25 1.25 0 0 1-.149-1.24A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10ZM8.5 8.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Zm-1.06 8.5a7 7 0 0 1 13.12 0H7.44Z" 
              clipRule="evenodd" 
            />
          </svg>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      className={cn(
        'transition-opacity duration-300',
        !imageLoaded && 'opacity-0',
        className
      )}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};

export default ImageWithFallback;
