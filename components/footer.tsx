export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      <div className="container mx-auto px-6 py-24">
        {/* Top Section */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 mb-16">
            <div className="flex-1">
              <h2 className="text-6xl md:text-7xl font-extralight tracking-tighter mb-6 leading-none">
                BLOW<br/>MIND
              </h2>
              <p className="text-lg font-light opacity-60 max-w-md">
                Building the Future, Marketing the Now.
              </p>
            </div>
            
            <div className="flex gap-4">
              <a
                href="#"
                className="w-14 h-14 border border-background/20 hover:border-background hover:bg-background/10 flex items-center justify-center transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-14 h-14 border border-background/20 hover:border-background hover:bg-background/10 flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-14 h-14 border border-background/20 hover:border-background hover:bg-background/10 flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="h-px bg-background/10 mb-16"></div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-xs font-light uppercase tracking-[0.2em] mb-6 opacity-40">Services</h4>
              <ul className="space-y-3 text-sm font-light">
                <li className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">Software Development</li>
                <li className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">App/Web Development</li>
                <li className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">Digital Marketing</li>
                <li className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">SEO</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-light uppercase tracking-[0.2em] mb-6 opacity-40">Company</h4>
              <ul className="space-y-3 text-sm font-light">
                <li>
                  <a href="#about" className="opacity-60 hover:opacity-100 transition-opacity">
                    About
                  </a>
                </li>
                <li>
                  <a href="#works" className="opacity-60 hover:opacity-100 transition-opacity">
                    Works
                  </a>
                </li>
                <li>
                  <a href="#contact" className="opacity-60 hover:opacity-100 transition-opacity">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-light uppercase tracking-[0.2em] mb-6 opacity-40">Connect</h4>
              <ul className="space-y-3 text-sm font-light">
                <li>
                  <a href="mailto:hello@blowmind.com" className="opacity-60 hover:opacity-100 transition-opacity">
                    blowmindist@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-light uppercase tracking-[0.2em] mb-6 opacity-40">Hours</h4>
              <p className="text-sm font-light opacity-60">
                Monday - Friday<br/>
                9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-background/10">
          <p className="text-xs font-light opacity-40 tracking-wider">
            &copy; {new Date().getFullYear()} BLOWMIND. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex gap-6 text-xs font-light opacity-40">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-background/5 rounded-full blur-[100px] pointer-events-none"></div>
    </footer>
  );
}

