import React from 'react';
import { AlertCircle } from 'lucide-react';
import './DistinctionFooter.css';

const Distinction: React.FC = () => {
  const lobbyImage = "/images/hotel_lobby.png";

  return (
    <section className="distinction-section section-padding">
      <div className="container">
        <div className="distinction-grid reveal">
          <div className="distinction-image-wrapper">
            <img src={lobbyImage} alt="Hotel Lobby" className="distinction-image" />
          </div>
          <div className="distinction-box glass-panel">
            <div className="distinction-icon">
              <AlertCircle size={48} color="var(--accent-gold)" />
            </div>
            <div className="distinction-content">
              <h3 className="text-gradient mb-2">Important Notice for Travelers</h3>
              <p>
                Please note that <strong>Hotel Sachin International in Roorkee</strong> (located in Kashipuri/Rampur area near Dwarikaadhish Mandir) is a distinctly separate property from the similarly named hotel in Haridwar. 
              </p>
              <p>
                We pride ourselves on offering a budget-conscious, highly functional stay with essential premium amenities tailored for business travelers and visitors to IIT Roorkee. Ensure you are booking with our Roorkee location for an exceptional experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Distinction;
