'use client';

export default function Footer() {
  const marqueeText = "Let's work together  ✱  ";
  const repeated = marqueeText.repeat(10);

  return (
    <footer className="footer" id="footer">
      {/* Marquee */}
      <div className="footer-marquee">
        <div className="footer-marquee-track">
          <span className="footer-marquee-text">{repeated}</span>
          <span className="footer-marquee-text">{repeated}</span>
        </div>
      </div>

      <div className="container">
        {/* Contact Info */}
        <div className="footer-contact">
          <a href="mailto:tvilas05@gmail.com" className="footer-email">
            tvilas05@gmail.com
          </a>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span className="footer-copyright">All rights reserved.</span>
            <span className="footer-location">Based in Troyes, France</span>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-menu">
              <a href="#skills">Skills</a>
              <a href="#about">About</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/tiago-vilas/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/tiagovls" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
