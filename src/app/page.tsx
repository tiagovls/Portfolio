import Hero from '@/components/Hero';
import Global3DCard from '@/components/Global3DCard';
import Navbar from '@/components/Navbar';
import Skills from '@/components/Skills';
import CreativeStatement from '@/components/CreativeStatement';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import WorkExperience from '@/components/WorkExperience';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative bg-[#F7F7FA]">
      <Global3DCard />
      <Hero />
      <Skills />
      <CreativeStatement />
      <About />
      <Portfolio />
      <WorkExperience />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <Navbar />
    </main>
  );
}
