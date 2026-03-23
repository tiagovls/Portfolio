'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import profilePic from '../../img/photo portrait.jpeg';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from('.contact-text > *', {
              opacity: 0,
              y: 30,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.12,
            });
            gsap.from('.contact-image-wrapper', {
              opacity: 0,
              x: 40,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.3,
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
    <section className="contact-section section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-content">
          <div className="contact-text">
            <span className="label block mb-2" style={{ fontFamily: '"Caveat", cursive', fontSize: '26px', textTransform: 'none', letterSpacing: '0', color: '#181818' }}>/ Contact Information</span>
            <h2 className="contact-title">
              How can I <span className="accent">help?</span>
            </h2>
            <p className="contact-desc">
              I would love to hear more about your project or network with fellow engineers.
              <br />
              If my mechanical and biomechanical research aligns with your needs, send me a note. I&apos;ll reply with the next step.
            </p>
            <form className="contact-form" action="https://formspree.io/f/mgondgny" method="POST">
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  required
                  className="form-input"
                  placeholder="Your name"
                  aria-label="Your name"
                />
                <input
                  type="email"
                  name="email"
                  required
                  className="form-input"
                  placeholder="Your email"
                  aria-label="Your email"
                />
              </div>
              <input
                type="text"
                name="subject"
                className="form-input"
                placeholder="Subject"
                aria-label="Subject"
              />
              <textarea
                name="message"
                required
                className="form-textarea"
                placeholder="Tell me about your project..."
                aria-label="Message"
              />
              <button type="submit" className="btn btn-accent" style={{ alignSelf: 'flex-start' }}>
                Send message
              </button>
            </form>
          </div>
          <div className="contact-image-wrapper hidden min-[1026px]:flex" style={{ flexDirection: 'column', height: '100%', minHeight: '520px' }}>
            <div className="contact-image" style={{ flex: 1, position: 'relative', borderRadius: '32px', overflow: 'hidden', width: '100%' }}>
              <img
                src={profilePic.src}
                alt="Tiago Vilas"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              />
            </div>
            {/* Laurel Badge SVG */}
            <svg className="laurel-badge" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.15)" />
              <path d="M20 50 C20 30, 30 20, 40 15 C50 20, 60 30, 60 50" stroke="white" strokeWidth="2" fill="none" />
              <text x="40" y="45" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">★</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
