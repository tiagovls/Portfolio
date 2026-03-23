'use client';

import ergoImg from '../../img/ergo.jpg';
import exoImg from '../../img/exosquelette.png';
import nereideImg from '../../img/nereide.png';
import robotImg from '../../img/robot.png';
import InteractiveBentoGallery from './ui/interactive-bento-gallery';

const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "Ergo Trainer",
    desc: "OsEntreprendre Competition",
    url: ergoImg.src,
    span: "col-span-1 row-span-3 md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    details: "I was tasked with creating an indoor training machine so athletes could practice while the lakes were frozen. This project proudly competed in the OsEntreprendre competition. During the development, I significantly expanded my technical skill set by training on professional CNC machines, milling equipment, and industrial cutters to ensure high-precision component fabrication from theoretical specifications to final welding.",
    link: "https://tiagovls.github.io/ergo-trainer/",
  },
  {
    id: 2,
    type: "image",
    title: "Future Project",
    desc: "Néréide H2 Boat Goal",
    url: nereideImg.src,
    span: "col-span-1 row-span-5 md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
    details: "My primary future objective is to join the Néréide association at UTT to contribute directly to the development of a hydrogen-powered vessel. This project focuses on pushing the boundaries of maritime sustainability through high-pressure hydrogen storage, fuel cell integration, and hydrofoil efficiency, aiming for a maritime revolution through clean-energy methodologies.",
    link: "#",
  },
  {
    id: 3,
    type: "image",
    title: "Exoskeleton Association",
    desc: "Dudognon & Sarazin",
    url: exoImg.src,
    span: "col-span-1 row-span-5 md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
    details: "I co-founded a dedicated engineering association along with two close friends, Thomas Dudognon and Wandrille Sarazin, with the ambitious goal of developing a functional mechanical exoskeleton. Although the project is still in progress, it involves rigorous CAD iteration and complex structural analyses to map natural joint kinematics for augmented lifting capacity without human impedance.",
    link: "#",
  },
  {
    id: 4,
    type: "image",
    title: "Mechatronics Robot",
    desc: "Catapult & Arduino",
    url: robotImg.src,
    span: "col-span-1 row-span-3 md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    details: "During my first engineering year, I designed and built a compact mechatronic robot for line following and slalom. The highlight was a custom-engineered catapult mechanism controlled by an Arduino, capable of launching a cork 5 meters into a bin. The construction utilized a mix of 3D-printed parts and creative recycled materials, mastering both logic and mechanical integration.",
    link: "#",
  },
];

export default function Portfolio() {
  return (
    <section className="section py-24 relative overflow-hidden" id="portfolio">
      <div className="container mx-auto px-4 max-w-5xl z-10 relative">
        <div className="flex flex-col items-start justify-start max-w-2xl text-left mb-10">
          <span className="label block mb-2" style={{ fontFamily: '"Caveat", cursive', fontSize: '24px', textTransform: 'none', letterSpacing: '0', color: '#181818' }}>/ Portfolio Projects</span>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-semibold tracking-tight text-[#2D2D2D] dark:text-white leading-none mb-3" style={{ letterSpacing: '-0.04em' }}>
            Selected <span className="text-[#F57C00]">Work Samples</span>
          </h2>
          <p className="text-lg text-[#7E7E7E] dark:text-gray-400 font-light mt-2">
            Drag and explore my curated collection of engineering projects.
          </p>
        </div>
      </div>
      <InteractiveBentoGallery
        mediaItems={mediaItems}
      />
    </section>
  );
}
