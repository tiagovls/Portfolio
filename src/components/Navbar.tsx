'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Reviews', href: '#testimonials' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: 'power3.out',
      delay: 1.2,
    });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Mobile Bar (Fixed) */}
      <div className="mobile-header min-[1026px]:hidden">
        <div /> {/* Spacer for flex-end alignment if needed, or just use justify-end */}
        <button 
          className="burger-btn-fixed" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
        </button>
      </div>

      <nav className="navbar" ref={navRef}>
        <div className="nav-container">
          {/* Desktop Logo */}


          {/* Desktop Menu */}
          <div className="nav-links-desktop hidden min-[1026px]:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-item"
                onClick={(e) => handleClick(e, item.href)}
              >
                <span className="nav-label">{item.label}</span>
              </a>
            ))}
            <a
              href="#contact"
              className="nav-item contact-btn ml-4"
              onClick={(e) => handleClick(e, '#contact')}
            >
              Contact me
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mobile-menu-overlay"
          >
            <div className="mobile-menu-container">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="mobile-nav-item"
                  onClick={(e) => handleClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mobile-nav-item mobile-contact-btn"
                onClick={(e) => handleClick(e, '#contact')}
              >
                Contact me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
