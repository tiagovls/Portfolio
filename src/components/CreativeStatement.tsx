'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import profilePic from '../../img/photo portrait.jpeg';

export default function CreativeStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  const handlePrintCV = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('/Portfolio/pdf/cv.pdf', '_blank');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from('.creative-text > *', {
              opacity: 0,
              y: 30,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.15,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="creative-section section" id="creative" ref={sectionRef}>
      <div className="container">
        <div className="creative-content">
          <div className="creative-text">
            <span className="label" style={{ fontFamily: '"Caveat", cursive', fontSize: '26px', textTransform: 'none', letterSpacing: '0', color: '#181818' }}>/ About Me</span>
            <h2 className="creative-title" style={{ letterSpacing: '-0.04em' }}>
              <span className="accent">Creative</span> at the Core
            </h2>
            <p className="creative-desc">
              Engineering Student. Web Developer. Bilingual.
            </p>
            <p className="creative-desc">
              I am a 19-year-old mechanical engineering student at UTT in France (turning 20 this September!). I am a native French speaker and hold a C1 English certification. Beyond academics, I am a passionate Judo black belt, a certified youth leader (BAFA), and an avid traveler. Exploring creative outlets like composing music on FLStudio, playing guitar and building websites has broadened my perspective and technical versatility. I am also deeply involved in associative life, notably with Surfutt, where I manage more than 90 people. My recent academic exchange in Canada pushed me further into hands-on manufacturing and project management.
            </p>
            <p className="creative-statement" style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>My impact is incomparable.</p>
            <div className="creative-buttons">
              <a href="mailto:tvilas05@gmail.com" className="btn btn-accent" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Schedule a call
              </a>
              <button className="btn" onClick={() => navigator.clipboard.writeText('tvilas05@gmail.com')}>
                Copy email
              </button>
              <button onClick={handlePrintCV} className="btn">
                Download CV
              </button>
            </div>

            <div style={{ marginTop: '48px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://www.instagram.com/tiago.vls/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37a4 4 0 1 1-4.26-3.87 4 4 0 0 1 4.26 3.87z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://www.linkedin.com/in/tiago-vilas/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="creative-image-wrapper hidden min-[1026px]:block" id="creative-3d-anchor">
            <div className="creative-image">
              <img
                src={profilePic.src}
                alt="Tiago Vilas creative portrait"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
