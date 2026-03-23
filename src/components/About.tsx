'use client';

import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Calculate how far through the section we've scrolled
      const progress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)));

      const words = textRef.current.querySelectorAll('span');
      words.forEach((word, i) => {
        const wordProgress = i / words.length;
        // Faster reveal curve: Starts at 15% scroll, completes fully at 65%
        if (progress > wordProgress * 0.5 + 0.15) {
          word.style.color = '#181818';
        } else {
          word.style.color = '#CCCCCC';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const statementText = "I am passionate about mechanics, robotics, and applied engineering. I set clear goals, embrace complex challenges, and design systems that work efficiently. When a project is done, the result is functional and measured, not just theoretical.";
  const words = statementText.split(' ');

  const tickerItems = [
    'Mechanical Engineering',
    'Université de Technologie de Troyes',
    'Cégep de Sherbrooke Exchange',
    'Applied Biomechanics',
    'CAD Prototyping',
    'Automation & Robotics',
    'Ergonomic Design Solutions',
  ];

  return (
    <>
      {/* Stats Ticker */}
      <div className="stats-ticker">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span className="ticker-item" key={i}>
              {item}
              <span className="ticker-separator">/</span>
            </span>
          ))}
        </div>
      </div>

      <section className="about-section section" id="about" ref={sectionRef}>
        <div className="container">
          <h3
            className="about-statement"
            ref={textRef}
          >
            {words.map((word, i) => (
              <span key={i} style={{ color: '#CCCCCC', transition: 'color 0.3s ease' }}>
                {word}{' '}
              </span>
            ))}
          </h3>
        </div>
      </section>
    </>
  );
}
