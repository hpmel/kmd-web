import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 450, damping: 28, mass: 0.2 });
  const cursorY = useSpring(-100, { stiffness: 450, damping: 28, mass: 0.2 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setIsFinePointer(finePointer);
    if (!finePointer) return;

    const handlePointerMove = (e: PointerEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target && (
          target.closest('a, button, input, textarea, select, [role="button"], .nav-orb, .menu-capsule, .button, .project-card, .service-card')
        )
      );
      setIsHovered(isInteractive);
    };

    const handlePointerDown = () => setIsClicked(true);
    const handlePointerUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <motion.div
        className="cursor-dot"
        style={{
          x: position.x,
          y: position.y,
        }}
        animate={{
          scale: isClicked ? 0.6 : isHovered ? 0.4 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicked ? 0.8 : isHovered ? 1.75 : 1,
          borderColor: isHovered ? 'rgba(246, 189, 212, 0.95)' : 'rgba(212, 23, 106, 0.85)',
          backgroundColor: isHovered ? 'rgba(212, 23, 106, 0.25)' : 'rgba(212, 23, 106, 0.04)',
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
