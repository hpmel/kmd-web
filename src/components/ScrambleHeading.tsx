import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { ScrambleIn } from './ScrambleIn';

interface ScrambleHeadingProps {
  text: string;
  id?: string;
  className?: string;
}

export function ScrambleHeading({ text, id, className = '' }: ScrambleHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <h2 ref={ref} id={id} className={className}>
      {reduceMotion ? text : <ScrambleIn text={text} delay={100} triggered={isInView} />}
    </h2>
  );
}
