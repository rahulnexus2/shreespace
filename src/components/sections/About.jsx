const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-white dark:bg-neutral-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* left — text */}
        <div>
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
            About us
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-white leading-tight mb-6">
            We build things<br/>that matter
          </h2>
          <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
            Navasha Tech is a full-service digital agency specializing in crafting modern web experiences. We combine technical expertise with creative vision to deliver solutions that make a real impact.
          </p>
          <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
            From concept to deployment, we work closely with our clients to understand their vision and translate it into digital products that drive real business results.
          </p>

          {/* skill tags */}
          <div className="flex flex-wrap gap-2">
            {['React', 'Node.js', 'UI/UX Design', 'Cloud', 'DevOps', 'API Integration', 'Mobile', 'SEO'].map(skill => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full hover:border-neutral-900 dark:hover:border-white hover:text-neutral-900 dark:hover:text-white transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* right — cards */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6">
              <p className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter mb-1">
                50+
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Projects delivered
              </p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6">
              <p className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter mb-1">
                98%
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Client satisfaction
              </p>
            </div>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6">
            <p className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter mb-1">
              5+
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              Years of experience
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Our team brings deep expertise across design, engineering, and strategy — so you get a partner, not just a vendor.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;