export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-light mb-6 tracking-tighter">
              BLOWMIND
            </h3>
            <p className="text-sm opacity-70 font-light leading-relaxed">
              Building the Future, Marketing the Now.
            </p>
          </div>

          <div>
            <h4 className="font-light mb-6 text-xs uppercase tracking-widest">Services</h4>
            <ul className="space-y-3 text-sm opacity-70 font-light">
              <li>Software Development</li>
              <li>App/Web Development</li>
              <li>Digital Marketing</li>
              <li>SEO</li>
            </ul>
          </div>

          <div>
            <h4 className="font-light mb-6 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm opacity-70 font-light">
              <li>
                <a href="#about" className="hover:opacity-100 transition-opacity">
                  About
                </a>
              </li>
              <li>
                <a href="#works" className="hover:opacity-100 transition-opacity">
                  Works
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:opacity-100 transition-opacity"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-light mb-6 text-xs uppercase tracking-widest">Connect</h4>
            <ul className="space-y-3 text-sm opacity-70 font-light">
              <li>
                <a
                  href="mailto:hello@blowmind.com"
                  className="hover:opacity-100 transition-opacity"
                >
                  hello@blowmind.com
                </a>
              </li>
              <li>LinkedIn</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center text-xs opacity-50 font-light tracking-wider">
          <p>
            &copy; {new Date().getFullYear()} BLOWMIND. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

