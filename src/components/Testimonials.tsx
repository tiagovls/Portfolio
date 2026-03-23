'use client';

import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { motion } from "framer-motion";

const avatar = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

const testimonials = [
  {
    text: "Collaborating with Tiago on the exoskeleton association is a pleasure. He brings impressive rigor in CAD and never gives up when facing complex technical challenges.",
    image: avatar,
    name: 'Thomas Dudognon',
    role: 'Association Co-founder',
  },
  {
    text: "Tiago is the driving force behind our projects. His ability to transform complex calculations into real physical prototypes is what pushes our research forward every day.",
    image: avatar,
    name: 'Wandrille Sarazin',
    role: 'Project Partner - UTT',
  },
  {
    text: "Tiago did exceptional work on the Ergo Trainer. He carefully listened to our specific athletic needs to create a machine that perfectly replicates the movement on water.",
    image: avatar,
    name: 'Board Member',
    role: 'Canoe-Kayak Club (Drummondville)',
  },
  {
    text: "A brilliant and dedicated student, both in his classes and his elective associative commitments. His curiosity for mechatronics and clean energy is truly remarkable.",
    image: avatar,
    name: 'Academic Teacher',
    role: 'Professor at UTT',
  },
  {
    text: "Tiago proved to be highly versatile and efficient during his time with us. His punctuality and understanding of logistics flows were a great help in managing our store operations.",
    image: avatar,
    name: 'Logistics Manager',
    role: 'Internship Supervisor (Le Comptoir des Fers)',
  },
  {
    text: "An incredible source of ideas. He managed the mechatronics robot design from start to finish, finding ingenious solutions using recycled materials and 3D printing.",
    image: avatar,
    name: 'Project Colleague',
    role: 'Engineering Student',
  },
  {
    text: "Tiago organized our surf trip to Hossegor flawlessly. Always in good spirits and capable of managing logistics for 50 people without any stress.",
    image: avatar,
    name: 'SURFUTT Member',
    role: 'Student Association',
  },
  {
    text: "Extremely rigorous with structural calculations. I've seen Tiago spend hours on SolidWorks to optimize every millimeter of his mechanical assemblies.",
    image: avatar,
    name: 'Peer / Student',
    role: 'Mechanical Engineering',
  },
  {
    text: "I worked with Tiago on the Ergo Trainer. He was deeply invested and motivated; he learns very quickly and brings a lot of positive energy to the team.",
    image: avatar,
    name: 'Project Collaborator',
    role: 'Construction Student',
  },
  {
    text: "He has a very clear vision of current energy issues. His ambition to join the Néréide project is perfectly aligned with his ethical values and technical skills.",
    image: avatar,
    name: 'School Peer',
    role: 'University of Technology',
  }
];

const firstColumn = testimonials.slice(0, 4);
const secondColumn = testimonials.slice(4, 8);
const thirdColumn = testimonials.slice(8, 12);

export default function Testimonials() {
  return (
    <section className="section py-24 relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 max-w-5xl z-10 relative">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
           viewport={{ once: true }}
           className="flex flex-col items-start justify-start max-w-2xl text-left"
        >
          <span className="label block mb-2" style={{ fontFamily: '"Caveat", cursive', fontSize: '26px', textTransform: 'none', letterSpacing: '0', color: '#181818' }}>/ Community Trust</span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2D2D2D] dark:text-white leading-none mb-3" style={{ letterSpacing: '-0.04em' }}>
            What <span className="text-[#F57C00]">people</span> say
          </h2>
          <p className="text-[19px] text-[#7E7E7E] dark:text-gray-400 font-light mt-2">
            A few thoughts from people who have experienced the value of working together.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] h-[600px] md:h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={23} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
        </div>
      </div>
    </section>
  );
}
