import React, { useState, useEffect } from 'react';

interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
}

const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export const ScrambleIn: React.FC<ScrambleInProps> = ({ text, delay, triggered }) => {
  const [revealIndex, setRevealIndex] = useState<number>(0);
  const [isStarted, setIsStarted] = useState(false);
  const [tick, setTick] = useState(0); // Used to trigger re-renders for character noise

  useEffect(() => {
    if (!triggered) {
      setIsStarted(false);
      setRevealIndex(0);
      return;
    }
    const timeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [triggered, delay]);

  useEffect(() => {
    if (!isStarted) return;
    
    const interval = setInterval(() => {
      setRevealIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return text.length;
        }
        return prev + 0.5; // 0.5 chars per frame (every 25ms)
      });
      setTick((t) => t + 1);
    }, 25);

    return () => clearInterval(interval);
  }, [isStarted, text.length]);

  if (!triggered || !isStarted) {
    return <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />;
  }

  const displayText = text
    .split('')
    .map((char, index) => {
      if (index < Math.floor(revealIndex)) {
        return char;
      }
      if (index < Math.floor(revealIndex) + 3) {
        if (char === ' ') return ' ';
        // Force evaluation of CHAR_SET with tick to ensure constant scrambling animation
        const randomIndex = Math.floor((Math.random() + tick * 0.0001) * CHAR_SET.length) % CHAR_SET.length;
        return CHAR_SET[randomIndex];
      }
      return '';
    })
    .join('');

  return <span>{displayText}</span>;
};
