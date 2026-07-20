import React, { useState } from 'react';
import './BookingSection.css';
import { Calendar, Users, PhoneCall, Loader2, CheckCircle2 } from 'lucide-react';

const BookingSection: React.FC = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setIsAvailable(false);
    
    // Simulate an API call
    setTimeout(() => {
      setIsChecking(false);
      setIsAvailable(true);
    }, 1500);
  };

  const receptionImage = "/images/hotel_reception.png";

  return (
    <section className="booking-section section-padding" id="booking">
      <div className="container">
        <div className="booking-wrapper reveal">
          <div className="booking-info">
            <h4 className="text-gold uppercase tracking-widest text-sm mb-2">Reserve Your Stay</h4>
            <h2 className="mb-5">Book Directly With Us</h2>
            <p className="mb-5 text-secondary">
              Experience the best of Roorkee. Secure your AC Deluxe room today. For immediate assistance or group bookings, feel free to call our front desk directly.
            </p>
            
            <div className="booking-image-wrapper mb-5">
              <img src={receptionImage} alt="Hotel Reception" className="booking-side-image" />
            </div>

            <div className="direct-call">
              <PhoneCall size={32} color="var(--accent-emerald)" />
              <div>
                <h5>Instant Booking Line</h5>
                <h3 className="text-gradient">+91 89181 49668</h3>
              </div>
            </div>
          </div>
          
          <div className="booking-form-container glass-panel">
            <h3>Check Availability</h3>
            
            {!isAvailable ? (
              <form className="booking-form" onSubmit={handleCheckAvailability}>
                <div className="form-group">
                  <label><Calendar size={16}/> Check-in Date</label>
                  <input type="date" className="form-control" required />
                </div>
                
                <div className="form-group">
                  <label><Calendar size={16}/> Check-out Date</label>
                  <input type="date" className="form-control" required />
                </div>
                
                <div className="form-group">
                  <label><Users size={16}/> Guests</label>
                  <select className="form-control">
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>2 Adults, 1 Child</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary form-submit" disabled={isChecking}>
                  {isChecking ? <><Loader2 className="spinner" size={20} style={{display: 'inline', animation: 'spin 1s linear infinite', marginRight: '8px'}} /> Checking...</> : 'Check Availability'}
                </button>
              </form>
            ) : (
              <div className="availability-success reveal">
                <CheckCircle2 size={48} color="var(--accent-emerald)" style={{margin: '0 auto 15px'}} />
                <h4 style={{color: 'var(--text-primary)', marginBottom: '15px', fontSize: '1.4rem'}}>Rooms are Available!</h4>
                <p style={{color: 'var(--text-secondary)', marginBottom: '25px', lineHeight: '1.6'}}>
                  We have AC Deluxe rooms ready for your selected dates. Since we process all bookings directly to guarantee you the best rate, please call us to finalize your reservation.
                </p>
                <a href="tel:+918918149668" className="btn-primary" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%'}}>
                  <PhoneCall size={20} /> Call Now to Book
                </a>
                <button 
                  onClick={() => setIsAvailable(false)} 
                  style={{background: 'none', border: 'none', color: 'var(--accent-gold)', marginTop: '20px', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline', width: '100%'}}
                >
                  Change Dates
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
