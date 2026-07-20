import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Smooth springing for the cursor follow
  const cursorX = useSpring(0, { stiffness: 300, damping: 20, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 20, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16); // Center the cursor (32px width / 2)
      cursorY.set(e.clientY - 16);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', updateHoverState);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateHoverState);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Small dot that exactly follows cursor */}
      <motion.div
        className="cursor-dot"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          opacity: isHidden ? 0 : 1
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Outer ring that smoothly follows */}
      <motion.div
        className="cursor-ring"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isHidden ? 0 : 1
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(184, 134, 11, 0.2)' : 'transparent',
          borderColor: isHovering ? 'transparent' : 'rgba(184, 134, 11, 0.6)',
          mixBlendMode: isHovering ? 'difference' : 'normal'
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
};

export default CustomCursor;
