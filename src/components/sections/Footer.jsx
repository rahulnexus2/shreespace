const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Footer = ({ onContactClick }) => {
  const navLinks = [
    { label: 'Services',     href: '#services'     },
    { label: 'Projects',     href: '#projects'     },
    { label: 'About',        href: '#about'        },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedInIcon },
    { label: 'GitHub',   href: 'https://github.com',   Icon: GitHubIcon   },
    { label: 'Twitter',  href: 'https://twitter.com',  Icon: TwitterIcon  },
  ];

  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-200">

  <div className="py-24 px-6 text-center border-b border-neutral-200 dark:border-neutral-800">
    <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
      Let's work together
    </p>
    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900 dark:text-white mb-4">
      Ready to build something great?
    </h2>
    <p className="text-neutral-500 dark:text-neutral-400 text-base mb-10 max-w-md mx-auto">
      Tell us about your project and we'll get back to you within 24 hours.
    </p>
    <button
      onClick={onContactClick}
      className="px-10 py-3.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer border-0"
    >
      Start a conversation
    </button>
  </div>

  <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-neutral-200 dark:border-neutral-800">

    <div className="md:col-span-1">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span className="font-bold text-base text-neutral-900 dark:text-white">Navasha Tech</span>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6 max-w-xs">
        Building modern digital experiences that elevate brands and drive real business results.
      </p>
      <div className="flex items-center gap-3">
        {socialLinks.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>

    <div>
      <h4 className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-5">
        Navigation
      </h4>
      <ul className="flex flex-col gap-3 list-none">
        {navLinks.map(item => (
         
          <li key={item.label}>
             <a
            
              href={item.href}
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors no-underline"
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={onContactClick}
            className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-0"
          >
            Contact
          </button>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-5">
        Contact
      </h4>
      <ul className="flex flex-col gap-3 list-none">
        <li className="text-sm text-neutral-500 dark:text-neutral-400">✉ hello@navashatech.com</li>
        <li className="text-sm text-neutral-500 dark:text-neutral-400">📍 Remote · Worldwide</li>
        <li className="text-sm text-neutral-500 dark:text-neutral-400">🕐 Mon–Fri, 9am–6pm IST</li>
      </ul>
    </div>

  </div>

  <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-3">
    <p className="text-xs text-neutral-400 dark:text-neutral-600">
      © 2026 Navasha Tech. All rights reserved.
    </p>
    <div className="flex items-center gap-5">
      {['Privacy Policy', 'Terms of Service'].map(item => (
        <button
          key={item}
          className="text-xs text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-400 transition-colors bg-transparent border-0 cursor-pointer p-0"
        >
          {item}
        </button>
      ))}
    </div>
  </div>

</footer>
  );
};

export default Footer;