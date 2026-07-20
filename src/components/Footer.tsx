import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import './DistinctionFooter.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section" id="book">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-brand reveal">
            <h2 className="text-gold mb-2">Sachin International</h2>
            <p className="mb-5">Experience luxury, comfort, and unmatched convenience in Roorkee.</p>
          </div>
          
          <div className="footer-contact reveal" style={{transitionDelay: '0.2s'}}>
            <h4 className="footer-heading">Contact Information</h4>
            <ul className="contact-list">
              <li>
                <Phone size={20} className="contact-icon" />
                <span>+91 89181 49668 (Bookings)</span>
              </li>
              <li>
                <Phone size={20} className="contact-icon" />
                <span>01334 222 455 (Landline)</span>
              </li>
              <li>
                <Clock size={20} className="contact-icon" />
                <span>Front Desk: 6:30 AM – 5:00 PM</span>
              </li>
              <li>
                <Mail size={20} className="contact-icon" />
                <span>Inquiries via phone primarily</span>
              </li>
            </ul>
          </div>
          
          <div className="footer-location reveal" style={{transitionDelay: '0.4s'}}>
            <h4 className="footer-heading">Location</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={20} className="contact-icon" />
                <div>
                  <p>Near Dwarikaadhish Mandir, Eidgah Chowk</p>
                  <p>Kashipuri/Rampur Area</p>
                  <p>Roorkee, Uttarakhand 247667</p>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Hotel Sachin International, Roorkee. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
