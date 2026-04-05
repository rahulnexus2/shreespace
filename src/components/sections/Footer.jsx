const Footer = ({ onContactClick }) => {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-200">

      {/* CTA strip */}
      <div className="py-24 px-6 text-center border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-white mb-3">
          Get in Touch
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-base mb-8">
          Ready to start your project? We'd love to hear from you.
        </p>
        <button
          onClick={onContactClick}
          className="px-10 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-base font-semibold hover:opacity-80 transition-opacity cursor-pointer border-0"
        >
          Contact Us
        </button>
      </div>

      {/* footer grid */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-5 gap-10 border-b border-neutral-200 dark:border-neutral-800">

        {/* brand col */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="font-bold text-base text-neutral-900 dark:text-white">
              Navasha Tech
            </span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 max-w-xs">
            Building modern digital experiences that elevate brands and drive results.
          </p>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
              ✉ hello@navashatech.com
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
              📍 Remote · Worldwide
            </span>
          </div>
        </div>

        {/* company */}
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
            Company
          </h4>
          <ul className="flex flex-col gap-3 list-none">
            {[
              { label: 'Services',      href: '#services'      },
              { label: 'Projects',      href: '#projects'      },
              { label: 'Testimonials',  href: '#testimonials'  },
              { label: 'Contact',       href: null             },
            ].map(item => (
              <li key={item.label}>
                <button
                  onClick={() => item.href ? window.location.href = item.href : onContactClick()}
                  className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-0 text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* services */}
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
            Services
          </h4>
          <ul className="flex flex-col gap-3 list-none">
            {['Web Development', 'UI/UX Design', 'Cloud Solutions', 'DevOps'].map(item => (
              <li key={item}>
                <button
                  onClick={() => { window.location.href = '#services'; }}
                  className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-0 text-left"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* legal */}
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
            Legal
          </h4>
          <ul className="flex flex-col gap-3 list-none">
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <li key={item}>
                <button
                  onClick={() => {}}
                  className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-0 text-left"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* bottom bar */}
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-3">
        <p className="text-xs text-neutral-400 dark:text-neutral-600">
          © 2026 Navasha Tech. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;