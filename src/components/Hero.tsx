import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import MagneticButton from './MagneticButton';
import './Hero.css';

function MouseRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 2, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function AnimatedSphere({ position, color, distort, scale, speed }: any) {
  const sphereRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      sphereRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.5;
      
      const targetScale = hovered ? scale * 1.2 : scale;
      sphereRef.current.scale.x = THREE.MathUtils.lerp(sphereRef.current.scale.x, targetScale, 0.1);
      sphereRef.current.scale.y = THREE.MathUtils.lerp(sphereRef.current.scale.y, targetScale, 0.1);
      sphereRef.current.scale.z = THREE.MathUtils.lerp(sphereRef.current.scale.z, targetScale, 0.1);
    }
  });

  return (
    <Sphere 
      ref={sphereRef} 
      position={position} 
      args={[1, 100, 100]} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={hovered ? distort * 1.5 : distort}
        speed={hovered ? speed * 2 : speed}
        roughness={0.1}
        metalness={0.9}
        clearcoat={1}
      />
    </Sphere>
  );
}

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Cinematic reveal variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 2.5, // wait for PageLoader
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <MouseRig />
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <pointLight position={[-5, 2, 0]} intensity={100} color="#7e22ce" />
          <pointLight position={[5, -2, 2]} intensity={100} color="#0284c7" />
          
          <AnimatedSphere position={[-6, 2, -4]} color="#ffffff" distort={0.3} scale={1.5} speed={1} />
          <AnimatedSphere position={[5, -3, -2]} color="#059669" distort={0.5} scale={1.2} speed={1.5} />
          <AnimatedSphere position={[0, -4, -6]} color="#b8860b" distort={0.4} scale={2} speed={0.8} />
          
          <Environment preset="city" />
        </Canvas>
      </div>
      
      <motion.div 
        className="hero-content"
        style={{ y, opacity }}
      >
        <motion.div 
          className="hero-text-box glass-panel"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h3 variants={itemVariants} className="hero-subtitle">
            Roorkee's Hidden Gem
          </motion.h3>
          <motion.h1 variants={itemVariants} className="hero-title">
            <span className="text-gradient">Sachin</span> International
          </motion.h1>
          <motion.p variants={itemVariants} className="hero-description">
            Experience functional luxury in the heart of the city.
          </motion.p>
          <motion.div variants={itemVariants} style={{ marginTop: '2rem' }}>
            <MagneticButton className="btn-primary" onClick={() => {
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Book Your Stay
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
