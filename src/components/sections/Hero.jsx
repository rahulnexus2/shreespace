const Hero = ({ onContactClick }) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-8">
          We Build Digital Products <br />
          That Drive Real Growth
        </h1>
        {/* Subtext */}
        <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
          From design and development to SEO, DevOps, and cloud solutions —
          we help startups and businesses create scalable digital experiences
          that turn visitors into customers.
        </p>  
        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button
            onClick={onContactClick}
            className="px-8 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-base font-semibold hover:opacity-80 transition"
          >
            Book a Consultation
          </button>

          <button
            onClick={() => (window.location.href = "#services")}
            className="px-8 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            Explore Services
          </button>
        </div>

        

      </div>
    </section>
  );
};

export default Hero;