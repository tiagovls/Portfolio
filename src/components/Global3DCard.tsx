'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import profilePic from '../../img/photo portrait.jpeg';

export default function Global3DCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1025;
      setIsMobile(mobile);
      if (mobile) {
        if (cardRef.current) cardRef.current.style.display = 'none';
        const heroAnchor = document.querySelector('#hero-3d-anchor') as HTMLElement;
        if (heroAnchor) heroAnchor.style.opacity = '1';
      } else {
        if (cardRef.current) cardRef.current.style.display = 'block';
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    let raf: number;
    let currentX = window.innerWidth / 2, currentY = window.innerHeight / 2;
    let currentScale = 1, currentRotY = 0;
    let currentW = 280, currentH = 350;

    let isRunning = false;
    let lastScrollY = -1;

    const update = () => {
      const heroAnchor = document.querySelector('#hero-3d-anchor') as HTMLElement;
      const creativeImg = document.querySelector('#creative-3d-anchor .creative-image') as HTMLElement;
      const skillsSection = document.querySelector('#skills') as HTMLElement;
      const creativeSection = document.querySelector('#creative') as HTMLElement;

      if (!heroAnchor || !skillsSection || !creativeSection) {
        raf = requestAnimationFrame(update);
        return;
      }

      heroAnchor.style.opacity = '0';
       
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      const skillsTop = skillsSection.offsetTop;
      const skillsBottom = skillsTop + skillsSection.offsetHeight;
      const creativePageTop = creativeSection.offsetTop - vh * 0.15;
       
      let targetX = 0, targetY = 0, targetScale = 1, targetRotY = 0;
      let targetW = heroAnchor.offsetWidth;
      let targetH = heroAnchor.offsetHeight;

      const heroRect = heroAnchor.getBoundingClientRect();
      const creativeRect = creativeImg?.getBoundingClientRect() || { top: 2000, left: 0, width: 280, height: 373 };

      const fixedTop = vh * 0.25;
      const fixedLeft = window.innerWidth > 1024 ? window.innerWidth * 0.60 : window.innerWidth * 0.5 - targetW / 2;

      // SCROLL PHASES
      if (scrollY < skillsTop - vh) {
        targetX = heroRect.left;
        targetY = heroRect.top;
        targetScale = 1;
        targetRotY = 0;
      } else if (scrollY >= skillsTop - vh && scrollY < skillsTop - vh * 0.3) {
        const phaseH = vh * 0.7;
        const progress = Math.max(0, Math.min(1, (scrollY - (skillsTop - vh)) / phaseH));
        const easeProgress = progress * progress * (3 - 2 * progress);
        targetX = heroRect.left * (1 - easeProgress) + fixedLeft * easeProgress;
        targetY = heroRect.top * (1 - easeProgress) + fixedTop * easeProgress;
        targetScale = 1 + 0.1 * easeProgress;
        targetRotY = 0;
      } else if (scrollY >= skillsTop - vh * 0.3 && scrollY < skillsBottom - vh) {
        targetX = fixedLeft;
        targetY = fixedTop;
        targetScale = 1.05;
        const rotProgress = (scrollY - (skillsTop - vh * 0.3)) / (skillsBottom - vh - (skillsTop - vh * 0.3));
        if (rotProgress < 0.05) targetRotY = (rotProgress / 0.05) * 180;
        else if (rotProgress < 0.95) targetRotY = 180;
        else targetRotY = 180 + ((rotProgress - 0.95) / 0.05) * 180;
      } else if (scrollY >= skillsBottom - vh && scrollY < creativePageTop) {
        const phaseH = creativePageTop - (skillsBottom - vh);
        const progress = Math.max(0, Math.min(1, (scrollY - (skillsBottom - vh)) / phaseH));
        const easeProgress = progress * progress * (3 - 2 * progress);
        targetX = fixedLeft * (1 - easeProgress) + creativeRect.left * easeProgress;
        targetY = fixedTop * (1 - easeProgress) + creativeRect.top * easeProgress;
        targetScale = 1.05 - 0.05 * easeProgress;
        targetRotY = 360;
        const finalW = creativeImg ? creativeImg.offsetWidth : 280;
        const finalH = creativeImg ? creativeImg.offsetHeight : 373;
        targetW = heroAnchor.offsetWidth * (1 - easeProgress) + finalW * easeProgress;
        targetH = heroAnchor.offsetHeight * (1 - easeProgress) + finalH * easeProgress;
      } else {
        targetX = creativeRect.left;
        targetY = creativeRect.top; 
        targetScale = 1;
        targetRotY = 360;
        targetW = creativeImg ? creativeImg.offsetWidth : 280;
        targetH = creativeImg ? creativeImg.offsetHeight : 373;
      }
       
      if (scrollY >= creativePageTop) {
        if (creativeImg) creativeImg.style.opacity = '1';
        if (cardRef.current) cardRef.current.style.opacity = '0';
      } else {
        if (creativeImg) creativeImg.style.opacity = '0';
        if (cardRef.current) cardRef.current.style.opacity = '1';
      }

      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;
      currentW += (targetW - currentW) * 0.35;
      currentH += (targetH - currentH) * 0.35;
      currentScale += (targetScale - currentScale) * 0.15;
      currentRotY += (targetRotY - currentRotY) * 0.15;

      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale}) rotateY(${currentRotY}deg)`;
        cardRef.current.style.width = `${currentW}px`;
        cardRef.current.style.height = `${currentH}px`;
      }

      // Continue the loop only if we are still far from target or if scrolling
      const isMoving = Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5 || Math.abs(targetRotY - currentRotY) > 0.5;
      
      if (isMoving || scrollY !== lastScrollY) {
        lastScrollY = scrollY;
        raf = requestAnimationFrame(update);
      } else {
        isRunning = false;
      }
    };

    const handleScroll = () => {
      if (window.innerWidth <= 1025) {
        if (cardRef.current) cardRef.current.style.display = 'none';
        const heroAnchor = document.querySelector('#hero-3d-anchor') as HTMLElement;
        const creativeImg = document.querySelector('#creative-3d-anchor .creative-image') as HTMLElement;
        if (heroAnchor) heroAnchor.style.opacity = '1';
        if (creativeImg) creativeImg.style.opacity = '1';
        return;
      }
      
      if (cardRef.current) cardRef.current.style.display = 'block';

      if (!isRunning) {
        isRunning = true;
        raf = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial position
    setTimeout(() => {
      handleScroll();
    }, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        transformStyle: 'preserve-3d',
        zIndex: 999,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 0.2s ease',
        willChange: 'transform, width, height'
      }}
    >
      {/* Front Face */}
      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <Image 
          src={profilePic} 
          alt="3D Portrait" 
          quality={70}
          fill
          className="object-cover"
          sizes="(max-width: 1025px) 0px, 300px"
        />
      </div>
      {/* Back Face */}
      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: '#000', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid #222' }}>
        <video 
          src="/img/backcardvid.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        {/* Transparent Black Overlay */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
          zIndex: 1
        }}>
          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0', letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Tiago Vilas</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', fontWeight: '400', margin: 0, lineHeight: '1.2' }}>Student in Mechanical Engineering</p>
        </div>
      </div>
    </div>
  );
}
