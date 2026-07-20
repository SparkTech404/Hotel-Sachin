import React, { useRef } from 'react';
import { Utensils, Coffee, Clock, CarFront, ShieldCheck, Wifi } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Amenities.css';

const Amenities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const amenitiesList = [
    { icon: <Utensils size={32} color="var(--accent-gold)" />, title: "In-house Restaurant", desc: "Savor exquisite multi-cuisine dishes." },
    { icon: <Coffee size={32} color="var(--accent-purple)" />, title: "Lounge Area", desc: "Relax and unwind in our elegant lounge." },
    { icon: <Clock size={32} color="var(--accent-cyan)" />, title: "24-Hour Room Service", desc: "Enjoy meals in the comfort of your room, anytime." },
    { icon: <CarFront size={32} color="var(--accent-emerald)" />, title: "Free Parking", desc: "Secure on-site parking for all our guests." },
    { icon: <ShieldCheck size={32} color="var(--accent-gold)" />, title: "Safety Assured", desc: "Equipped with smoke detectors and 24/7 security." },
    { icon: <Wifi size={32} color="var(--accent-purple)" />, title: "High-Speed Connectivity", desc: "Stay connected with telephones in every room." }
  ];

  const restaurantImage = "/images/hotel_restaurant.png";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section className="amenities-section section-padding" ref={containerRef}>
      <div className="container">
        
        <div className="amenities-grid">
          <div className="amenities-content">
            <motion.h4 
              className="text-gold mb-2 uppercase tracking-widest text-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Services & Amenities
            </motion.h4>
            <motion.h2 
              className="mb-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Designed for Your Convenience
            </motion.h2>
            
            <motion.div 
              className="amenities-cards"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {amenitiesList.map((item, index) => (
                <motion.div key={index} className="amenity-card glass-panel" variants={itemVariants}>
                  <div className="amenity-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="amenities-image-side"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
             <div className="image-container glass-panel" style={{ overflow: 'hidden' }}>
              <motion.img 
                src={restaurantImage} 
                alt="Hotel Sachin International Restaurant" 
                className="amenity-side-image"
                style={{ y: imageY, scale: 1.1 }}
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop' }}
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Amenities;
