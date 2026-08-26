import React from 'react';

interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

/**
 * Minimalist luxury outline glyph for WhatsApp
 * Designed to conform to luxury monochrome / bronze aesthetics rather than the bright green neon app icon.
 */
export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className = "w-4 h-4", size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9.5 9.5c.3.5.7 1.1 1.2 1.6.5.5 1.1.9 1.6 1.2.3.2.7.1.9-.1l.7-.7c.3-.3.8-.3 1.1-.1l1.5.7c.4.2.6.7.4 1.1-.3.7-1 1.4-1.8 1.6-.7.2-1.6.1-2.9-.6-1.5-.8-2.9-2.2-3.7-3.7-.7-1.3-.8-2.2-.6-2.9.2-.8.9-1.5 1.6-1.8.4-.2.9 0 1.1.4l.7 1.5c.2.3.2.8-.1 1.1l-.7.7c-.2.2-.3.6-.1.9z" strokeWidth="1.2" />
    </svg>
  );
};
