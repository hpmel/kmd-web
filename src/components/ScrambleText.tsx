import React, { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, isHovered, className = "" }) => {
  const [revealIndex, setRevealIndex] = useState<number>(text.length);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (isHovered) {
      setRevealIndex(0);
      const interval = setInterval(() => {
        setRevealIndex((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return text.length;
          }
          return prev + 0.25; // 4 frames per character (1/4 = 0.25)
        });
        setTick((t) => t + 1);
      }, 25);
      return () => clearInterval(interval);
    } else {
      setRevealIndex(text.length);
    }
  }, [isHovered, text]);

  const displayText = text
    .split('')
    .map((char, index) => {
      if (index < Math.floor(revealIndex)) {
        return char;
      }
      if (char === ' ') return ' ';
      const randomIndex = Math.floor((Math.random() + tick * 0.0001) * CHAR_SET.length) % CHAR_SET.length;
      return CHAR_SET[randomIndex];
    })
    .join('');

  return <span className={className}>{isHovered ? displayText : text}</span>;
};
