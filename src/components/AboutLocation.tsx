import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AboutLocation.css';

const AboutLocation: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Assuming we copy the generated exterior image here
  const exteriorImage = "/images/hotel_exterior.png"; 

  return (
    <section className="about-section section-padding" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h4 className="reveal text-gold">Location & Accessibility</h4>
            <h2 className="reveal">Perfectly Situated in Roorkee</h2>
            <p className="reveal">
              Located in the Kashipuri/Rampur area near Dwarikaadhish Mandir and Eidgah Chowk, our hotel offers unparalleled convenience. 
            </p>
            <ul className="about-list reveal">
              <li><strong>IIT Roorkee:</strong> Just a short drive away (~12.2km from city center).</li>
              <li><strong>Solani Aqueduct:</strong> ~27km proximity to this historic landmark.</li>
              <li><strong>Industrial Hubs:</strong> Close to Puhana and Landhaura Industrial Areas.</li>
            </ul>
          </div>
          
          <div className="about-image-wrapper reveal">
            <div className="image-container glass-panel">
              <img 
                ref={imageRef} 
                src={exteriorImage} 
                alt="Hotel Sachin International Exterior" 
                className="parallax-image"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?q=80&w=1000&auto=format&fit=crop' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLocation;
