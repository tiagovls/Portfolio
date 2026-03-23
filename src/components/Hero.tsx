'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { AuroraBackground } from './ui/aurora-background';
import profilePic from '../../img/photo portrait.jpeg';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', stagger: 0.2, delay: 0.3 });
      gsap.from('.hero-name', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', stagger: 0.15, delay: 0.5 });
      gsap.from('.hero-image-wrapper', { opacity: 0, scale: 0.9, duration: 1, ease: 'power3.out', delay: 0.4 });
      gsap.from('.hero-location', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', delay: 0.9 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="home" ref={sectionRef}>
      <AuroraBackground />
      <div className="hero-content">
        <div className="hero-left">
          <span className="hero-subtitle">Creative &amp; Motivated</span>
          <h1 className="hero-name">TIAGO</h1>
        </div>
        <div className="hero-center">
          <div className="hero-image-wrapper min-[1026px]:opacity-0" id="hero-3d-anchor">
            <Image
              src={profilePic}
              alt="Tiago Vilas portrait"
              quality={70}
              priority
              placeholder="blur"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 220px, 280px"
              style={{ opacity: 'inherit' }}
            />
          </div>
        </div>
        <div className="hero-right">
          <span className="hero-subtitle">Mechanical Engineering Student</span>
          <h1 className="hero-name">VILAS</h1>
          <span className="hero-location">Troyes, France</span>
        </div>
      </div>
    </section>
  );
}
