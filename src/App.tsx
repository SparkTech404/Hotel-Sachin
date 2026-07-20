import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import AboutLocation from './components/AboutLocation';
import Rooms from './components/Rooms';
import Amenities from './components/Amenities';
import Distinction from './components/Distinction';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Keep GSAP for elements that haven't been migrated to Framer Motion yet
      gsap.utils.toArray('.reveal').forEach((elem: any) => {
        gsap.fromTo(elem, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={appRef} className="app-container">
      <CustomCursor />
      <PageLoader />
      
      <Hero />
      <AboutLocation />
      <Rooms />
      <Amenities />
      <BookingSection />
      <Distinction />
      <Footer />
    </div>
  );
}

export default App;
