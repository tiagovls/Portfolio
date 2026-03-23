'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const skills = [
  {
    number: '01',
    title: 'CAD & 3D Modeling',
    badge: 'Prototyping',
    desc: 'Expertise in conceptualizing and designing complex mechanical assemblies and components for manufacturing.',
    tags: ['SolidWorks', 'CATIA', 'Fusion360', 'AutoCAD', 'Creo'],
  },
  {
    number: '02',
    title: 'Ergonomics & Biomechanics',
    badge: 'Human-Centric',
    desc: 'Bridging the gap between machinery and the human body. Applied directly in projects like the Ergo Trainer to optimize human integration.',
    tags: ['Biomechanical Analysis', 'Physical Ergonomics', 'Safety Protocols', 'Human-Machine Interfaces'],
  },
  {
    number: '03',
    title: 'Industrial automation',
    badge: 'Future Forward',
    desc: 'Coding automated systems capable of precision manufacturing and autonomous operation.',
    tags: ['Sysmac Studio', 'Make', 'Sensors', 'Industrial Robotics'],
  },
  {
    number: '04',
    title: 'Manufacturing Processes',
    badge: 'Build Ready',
    desc: 'Transforming digital models into physical prototypes using modern and traditional fabrication methods.',
    tags: ['3D Printing (FDM/SLA)', 'CNC Machining', 'Laser Cutting', 'Material Selection', 'DFM'],
  },
  {
    number: '05',
    title: 'Fluid Mechanics',
    badge: 'Dynamics',
    desc: 'Analyzing the behavior of liquids and gases in motion through piping, turbine, and aerodynamic structures.',
    tags: ['Wave calculation', 'Thermodynamics', 'Heat Transfer'],
  },
  {
    number: '06',
    title: 'Programming & Scripting',
    badge: 'Logic Logic Logic',
    desc: 'Developing software scripts to automate CAD operations, analyze complex datasets, and run robotic hardware.',
    tags: ['Python', 'C++', 'Arduino', 'Java', 'HTML/CSS'],
  },
  {
    number: '07',
    title: 'Structural Analysis',
    badge: 'Durability',
    desc: 'Testing mechanical components for stress, strain, and fatigue limitations ensuring safe physical deployment.',
    tags: ['Safety factor calculation', 'Statistics', 'Material Strength'],
  },
  {
    number: '08',
    title: 'Project Management',
    badge: 'Leadership',
    desc: 'Guiding engineering projects from theoretical specifications clear through to prototyping, testing, and validation.',
    tags: ['Gantt', 'C1 english level', 'Budgeting', 'Cross-functional Collaboration', 'Technical Documentation'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1025);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll('.skill-card');
      let highestStuckIndex = -1;
      const vh = window.innerHeight * 0.15; // 15vh

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const stickyTop = vh + i * 15;
        // Card is at or above its sticky point
        if (rect.top <= stickyTop + 2) {
          highestStuckIndex = i;
        }
      });

      setActiveIndex(highestStuckIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(entry.target, {
              opacity: 0,
              y: 40,
              duration: 0.6,
              ease: 'power3.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.skill-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="skills-header">
          <div className="skills-header-left">
            <span className="label block mb-2" style={{ fontFamily: '"Caveat", cursive', fontSize: '26px', textTransform: 'none', letterSpacing: '0', color: '#181818' }}>/ Software, Hardware, Mechanics</span>
            <h2 className="skills-title">What I do <span className="accent">best?</span></h2>
            <p className="skills-description">
              I lead mechanical projects, bridging the gap between theoretical physics, CAD processing, and physical prototypes to solve real-world problems.
            </p>
          </div>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => {
            const rot = [-4, 3, -2, 5, -3, 2, -5, 4][index % 8];
            const tx = [10, -15, 20, -5, -20, 15, -10, 5][index % 8];

            return (
              <div
                className="skill-card"
                key={skill.number}
                style={{
                  top: `calc(15vh + ${index * 15}px)`,
                  position: 'sticky',
                  '--rot': isMobile ? '0deg' : `${rot}deg`,
                  '--tx': isMobile ? '0px' : `${tx}px`,
                  zIndex: index + 1,
                  pointerEvents: index < activeIndex ? 'none' : 'auto',
                } as React.CSSProperties}
              >
                <span className="skill-badge">{skill.badge}</span>
                <h3 className="skill-card-title">
                  {skill.number}. {skill.title}
                </h3>
                <p className="skill-card-desc">{skill.desc}</p>
                <ul className="skill-tags-list">
                  {skill.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
