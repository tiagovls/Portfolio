'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const experiences = [
  { role: 'University Trip Organizer & Lead', years: '2025', company: 'Association SURFUTT' },
  { role: 'Youth Center Leader', years: '2024', company: 'Beaune Côté Sud' },
  { role: 'Order Picker & Store Assistant', years: '2024', company: 'Le Comptoir des Fers (Chalon-sur-Saône)' },
  { role: 'Mechanical Engineering Student', years: '2024 – Current', company: 'Université de Technologie de Troyes (UTT)' },
  { role: 'Academic Exchange / Ergo Project', years: '2024', company: 'Cégep de Sherbrooke (Canada)' },
  { role: 'Holiday Camp Counselor', years: '2023', company: 'Familles Rurales' },
  { role: 'Agricultural Worker (Seasonal)', years: '2023', company: 'GED AGRI EMPLOI RURAL' },
];

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  const handlePrintCV = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('/pdf/cv.pdf', '_blank');
  };

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.experience-item');
    if (!cards || cards.length === 0) return;

    // Instantly hide and blur all items before any scrolling occurs
    gsap.set(cards, { opacity: 0, y: 30, filter: 'blur(15px)' });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate target item when it enters the viewport securely
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.35,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          } else {
            // Reverse transition to invisible and blurred when leaving the viewport
            gsap.to(entry.target, {
              opacity: 0,
              y: -30,
              filter: 'blur(15px)',
              duration: 0.15,
              ease: 'power2.in',
              overwrite: 'auto',
            });
          }
        });
      },
      // -10% triggers closer to the absolute bottom of the screen!
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    // Attach observer to each individual row locally
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section py-24" id="experience" ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-20 gap-6">
          <div>
            <span className="label block mb-2" style={{ fontFamily: '"Caveat", cursive', fontSize: '26px', textTransform: 'none', letterSpacing: '0', color: '#181818' }}>/ Career</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2D2D2D] dark:text-white leading-none mb-3" style={{ letterSpacing: '-0.04em' }}>
              Work <span className="text-[#F57C00]">Experience</span>
            </h2>
            <p className="text-[19px] text-[#7E7E7E] dark:text-gray-400 font-light mt-2">My impact over the years.</p>
          </div>
          <div className="sm:mt-6">
            <button
              onClick={handlePrintCV}
              className="px-4 py-1.5 sm:px-5 sm:py-2 bg-[#DFDFDF] hover:bg-[#D4D4D4] dark:bg-gray-800 dark:hover:bg-gray-700 text-[#2D2D2D] dark:text-white rounded-full font-medium text-sm transition-colors shadow-sm"
            >
              Download CV
            </button>
          </div>
        </div>
        <ul className="flex flex-col w-full border-t border-[#D4D4D4]/70 dark:border-gray-800">
          {experiences.map((exp, i) => (
            <li 
              className="experience-item flex flex-col sm:flex-row sm:items-start justify-between py-6 sm:py-8 border-b border-[#D4D4D4]/70 dark:border-gray-800" 
              key={i}
            >
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <span className="text-lg sm:text-xl font-medium tracking-tight text-[#2D2D2D] dark:text-white">{exp.role}</span>
                <span className="text-sm sm:text-base text-[#8E8E8E] dark:text-gray-400 font-light">{exp.company}</span>
              </div>
              <div className="text-sm sm:text-base text-[#8E8E8E] dark:text-gray-500 font-light mt-2 sm:mt-0 whitespace-nowrap">
                {exp.years}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
