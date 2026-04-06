import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ onContactClick, onFeedbackClick }) => {
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">

      {/* logo */}
      <a href="#home" className="flex items-center gap-2 no-underline">
        <div className="w-9 h-9 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
            stroke={dark ? '#111' : '#fff'} strokeWidth="2" strokeLinecap="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span className="font-bold text-lg text-neutral-900 dark:text-white tracking-tight">
          Navasha Tech
        </span>
      </a>

      {/* center links — desktop */}
      <ul className="hidden md:flex items-center gap-8 list-none absolute left-1/2 -translate-x-1/2">
        {['About', 'Services', 'Projects', 'Testimonials'].map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors no-underline">
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* right side */}
      <div className="flex items-center gap-3">

        {/* theme toggle */}
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-base text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer bg-transparent"
          aria-label="Toggle theme"
        >
          {dark ? '☀️' : '☽'}
        </button>

        {/* feedback button — desktop */}
        <button
          onClick={onFeedbackClick}
          className="hidden md:block px-5 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer bg-transparent"
        >
          Feedback
        </button>

        {/* get started — desktop */}
        <button
          onClick={onContactClick}
          className="hidden md:block px-5 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer border-0"
        >
          Get Started
        </button>

        {/* mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(p => !p)}
          className="md:hidden w-9 h-9 flex items-center justify-center text-neutral-600 dark:text-neutral-400 bg-transparent border-0 cursor-pointer"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 flex flex-col px-6 py-4 gap-4 md:hidden">
          {['About', 'Services', 'Projects', 'Testimonials'].map(link => (
            <button
              key={link}
              onClick={() => { setMenuOpen(false); window.location.href = `#${link.toLowerCase()}`; }}
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-left bg-transparent border-0 cursor-pointer p-0"
            >
              {link}
            </button>
          ))}

          {/* feedback — mobile */}
          {/* feedback — mobile */}
<button
  onClick={() => { setMenuOpen(false); onFeedbackClick(); }}
  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-left bg-transparent border-0 cursor-pointer p-0"
>
  Feedback
</button>

{/* get started — mobile */}
<button
  onClick={() => { setMenuOpen(false); onContactClick(); }}
  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-left bg-transparent border-0 cursor-pointer p-0"
>
  Get Started
</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;