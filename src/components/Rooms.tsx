import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import MagneticButton from './MagneticButton';
import './Rooms.css';

const Rooms: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const roomImage = "/images/hotel_room.png";

  // 3D Tilt Effect
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const yAxis = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(yAxis, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    yAxis.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    yAxis.set(0);
  };

  return (
    <section className="rooms-section section-padding" ref={containerRef}>
      <div className="container">
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h4 className="text-gold uppercase tracking-widest text-sm mb-2">Accommodations</h4>
          <h2>Unwind in Comfort</h2>
          <p className="max-w-2xl mx-auto">Experience our budget-friendly yet elegantly designed rooms tailored for your ultimate relaxation.</p>
        </motion.div>
        
        <div className="rooms-container" style={{ perspective: 1000 }}>
          <motion.div 
            ref={cardRef}
            className="room-card glass-panel interactive"
            style={{ 
              y, 
              opacity,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="room-image-wrapper" style={{ transform: "translateZ(50px)" }}>
              <img 
                src={roomImage} 
                alt="AC Deluxe Room" 
                className="room-image" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop' }}
              />
              <div className="room-price" style={{ transform: "translateZ(80px)" }}>
                <span>From</span>
                <h4>₹1,726 / night</h4>
              </div>
            </div>
            <div className="room-details" style={{ transform: "translateZ(60px)" }}>
              <h3>AC Deluxe</h3>
              <p>Perfect for 2 adults, featuring a king bed, air conditioning, and standard elegant furnishings.</p>
              <ul className="room-features">
                <li>King Size Bed</li>
                <li>Air Conditioning</li>
                <li>Mineral Water</li>
                <li>Closet & Telephone</li>
              </ul>
              <div style={{marginTop: '20px'}}>
                <MagneticButton className="btn-primary" onClick={() => {
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Book Now
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
