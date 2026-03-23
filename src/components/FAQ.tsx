'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "Where do you currently study and what is your major?",
    answer: "I am a mechanical engineering student at the Université de Technologie de Troyes (UTT) in France. I recently completed an academic exchange at Cégep de Sherbrooke in Canada, where I specialized in hands-on manufacturing and project management.",
  },
  {
    question: "What was your main contribution to the Ergo Trainer project?",
    answer: "I led the mechanical design and functional prototyping. This involved translating athlete requirements into technical specs, performing structural CAD optimizations, and personally handling the manufacturing using professional CNC and milling machines.",
  },
  {
    question: "Tell me about the Exoskeleton association you co-founded.",
    answer: "I co-founded a student engineering association with Thomas Dudognon and Wandrille Sarazin. Our goal is to develop a functional mechanical exoskeleton. I manage the CAD iteration and kinematic studies to ensure the device mimics natural human joint movement.",
  },
  {
    question: "How did your experience in Canada impact your engineering approach?",
    answer: "My time in Sherbrooke shifted my focus from pure theory to practical execution. It allowed me to work directly with industrial machinery and taught me how to bridge the gap between a digital 3D model and a functional physical product.",
  },
  {
    question: "What technical software and tools do you specialize in?",
    answer: "I am highly proficient in SolidWorks, CATIA, and Creo for 3D modeling. For logic and control, I use Arduino. On the creative side, I use FLStudio for music composition and various web technologies for building digital interfaces.",
  },
  {
    question: "What is your role in the Néréide hydrogen boat project?",
    answer: "Next semester I will be in charge of the boat's cockpit.",
  },
  {
    question: "Are you available for international internships or summer roles?",
    answer: "Yes! Being fully bilingual (Native French, C1 English) and having experience living in North America, I am eager to take on international challenges. I am currently seeking opportunities that combine mechanical engineering and innovative technology.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="faq-section section" id="faq">
      <div className="container">
        <span className="label block mb-2" style={{ fontFamily: '"Caveat", cursive', fontSize: '26px', textTransform: 'none', letterSpacing: '0', color: '#181818' }}>/ Questions & Answers</span>
        <h2 className="faq-title">
          Frequently Asked <span className="accent">Questions</span>
        </h2>
        <ul className="faq-list">
          {faqs.map((faq, i) => (
            <li className={`faq-item ${openIndex === i ? 'open' : ''}`} key={i}>
              <button className="faq-question" onClick={() => toggle(i)}>
                {faq.question}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p className="faq-answer-text">{faq.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
