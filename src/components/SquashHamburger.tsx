import React from 'react';
import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
}

export const SquashHamburger: React.FC<SquashHamburgerProps> = ({ isOpen, onClick, className = "", ariaLabel = 'Toggle menu', ariaExpanded, ariaControls }) => {
  const transition = { type: "spring" as const, stiffness: 300, damping: 20 };

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col justify-between focus:outline-none select-none cursor-pointer ${className} 
        w-[18px] h-[12px] sm:w-[24px] sm:h-[16px]`}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      {/* Top Bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full h-[1.5px] sm:h-[2px]"
        animate={isOpen ? { top: "50%", y: "-50%", rotate: 45 } : { top: "0%", y: "0%", rotate: 0 }}
        transition={transition}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      
      {/* Middle Bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full h-[1.5px] sm:h-[2px] top-1/2 -translate-y-1/2"
        animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
        transition={transition}
      />
      
      {/* Bottom Bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full h-[1.5px] sm:h-[2px]"
        animate={isOpen ? { top: "50%", y: "-50%", rotate: -45 } : { top: "100%", y: "-100%", rotate: 0 }}
        transition={transition}
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </button>
  );
};
