const Hero = ({ onContactClick }) => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">

      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 dark:text-white leading-tight max-w-4xl mb-6">
        Building Modern<br/>Digital Experiences
      </h1>

      <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed font-normal mb-10">
        We craft beautiful, high-performance websites and applications that help businesses thrive in the digital age.
      </p>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button
          onClick={onContactClick}
          className="px-8 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-base font-semibold hover:opacity-80 transition-opacity cursor-pointer border-0"
        >
          Get Started
        </button>
        <button
          onClick={() => { window.location.href = '#services'; }}
          className="px-8 py-3 rounded-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-base font-semibold border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors cursor-pointer"
        >
          Learn More
        </button>
      </div>

    </section>
  );
};

export default Hero;