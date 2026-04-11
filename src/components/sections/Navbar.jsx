
{/*
const Navbar = ({ onContactClick, onFeedbackClick }) => {
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">

      
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

     
      <ul className="hidden md:flex items-center gap-8 list-none absolute left-1/2 -translate-x-1/2">
        {['About', 'Services', 'Projects', 'Testimonials'].map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors no-underline">
              {link}
            </a>
          </li>
        ))}
      </ul>

      
      <div className="flex items-center gap-3">

       
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-base text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer bg-transparent"
          aria-label="Toggle theme"
        >
          {dark ? '☀️' : '☽'}
        </button>

       
        <button
          onClick={onFeedbackClick}
          className="hidden md:block px-5 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer bg-transparent"
        >
          Feedback
        </button>

        
        <button
          onClick={onContactClick}
          className="hidden md:block px-5 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer border-0"
        >
          Get Started
        </button>

      
        <button
          onClick={() => setMenuOpen(p => !p)}
          className="md:hidden w-9 h-9 flex items-center justify-center text-neutral-600 dark:text-neutral-400 bg-transparent border-0 cursor-pointer"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

     
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

         
<button
  onClick={() => { setMenuOpen(false); onFeedbackClick(); }}
  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-left bg-transparent border-0 cursor-pointer p-0"
>
  Feedback
</button>


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

export default Navbar;*/}


import { useState, useContext } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { ServicesContext } from "../../context/ServicesContext";

const Navbar = ({ onContactClick, onFeedbackClick }) => {
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const { services = [], loading } = useContext(ServicesContext);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">

      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2 no-underline">
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
      </Link>

      {/* NAV LINKS */}
      <ul className="hidden md:flex items-center gap-8 list-none absolute left-1/2 -translate-x-1/2">
        {[
          { name: "About", path: "/about" },
          { name: "Services" },
          { name: "Projects", path: "/projects" },
          { name: "Testimonials", path: "/testimonials" }
        ].map((link) => {

          
          
                if (link.name === "Services") {
  return (
    <li
      key={link.name}
      onMouseEnter={() => setActiveMenu("services")}
      onMouseLeave={() => setActiveMenu(null)}
      className="relative flex items-center"  
      
    >
      <span className="text-sm font-medium cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
        {link.name}  {/* ← was link.title, should be link.name */}
      </span>

      {activeMenu === "services" && (
        <div className="absolute top-full left-0 w-52 bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-2 z-50">
          {loading ? (
            <p className="px-3 py-2 text-sm">Loading...</p>
          ) : (
            services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="block px-3 py-2 text-sm rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 no-underline text-neutral-700 dark:text-neutral-300"
              >
                {service.title}
              </Link>
            ))
          )}
        </div>
      )}
    </li>
  );
}

          
          return (
            <li key={link.name}>
              <Link
                to={link.path}
                className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors no-underline"
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        <button
          onClick={toggle}
          className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-base text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer bg-transparent"
        >
          {dark ? '☀️' : '☽'}
        </button>

        <button
          onClick={onFeedbackClick}
          className="hidden md:block px-5 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm"
        >
          Feedback
        </button>

        <button
          onClick={onContactClick}
          className="hidden md:block px-5 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold"
        >
          Get Started
        </button>

        <button
          onClick={() => setMenuOpen(p => !p)}
          className="md:hidden"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* MOBILE MENU */}
      {/* MOBILE MENU */}
{menuOpen && (
  <div className="absolute top-16 left-0 right-0 bg-white dark:bg-neutral-950 flex flex-col px-6 py-4 gap-4 md:hidden">
    {[
      { name: "About", path: "/about" },
      { name: "Services" },
      { name: "Projects", path: "/projects" },
      { name: "Testimonials", path: "/testimonials" }
    ].map(link => {

      if (link.name === "Services") {
        return (
          <div key="services">
            <button
              onClick={() => setActiveMenu(activeMenu === "services" ? null : "services")}
              className="text-left w-full flex items-center justify-between text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Services
              <span>{activeMenu === "services" ? "▲" : "▼"}</span>
            </button>

            {activeMenu === "services" && (
              <div className="mt-2 flex flex-col gap-1 pl-3 border-l border-neutral-200 dark:border-neutral-700">
                {loading ? (
                  <p className="text-sm text-neutral-400">Loading...</p>
                ) : (
                  services.map(service => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveMenu(null);
                        navigate(`/services/${service.id}`);
                      }}
                      className="text-left text-sm py-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    >
                      {service.title}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        );
      }

      return (
        <button
          key={link.name}
          onClick={() => {
            setMenuOpen(false);
            navigate(link.path);
          }}
          className="text-left text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {link.name}
        </button>
      );
    })}
  </div>
)}
    </nav>
  );
};

export default Navbar;