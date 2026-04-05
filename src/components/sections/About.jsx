import { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import aboutService from '../../api/services/aboutService';

const AboutSkeleton = () => (
  <div className="flex flex-col gap-4">
    <div className="h-8 w-2/3 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
    <div className="h-3 w-full bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
    <div className="h-3 w-4/5 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
    <div className="h-3 w-3/5 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
  </div>
);

const About = () => {
  const { data, loading, execute } = useApi(aboutService.getActive);

  useEffect(() => {
    execute();
  }, []);

  // pick last entry (most recent)
  const about = data?.[data.length - 1];

  return (
    <section id="about" className="py-24 px-6 bg-white dark:bg-neutral-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* left — text */}
        <div>
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
            About us
          </p>

          {loading ? <AboutSkeleton /> : (
            <>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-white leading-tight mb-6">
                {about?.title || 'We build things that matter'}
              </h2>

              {/* render HTML content */}
              <div
                className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed space-y-4 mb-8 [&>p]:text-base [&>p]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: about?.content || '' }}
              />
            </>
          )}
        </div>

        {/* right */}
        <div className="flex flex-col gap-4">
          {about?.imageUrl ? (
            <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
              <img
                src={about.imageUrl}
                alt={about.title}
                className="w-full h-72 object-cover"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6">
                  <p className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter mb-1">50+</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Projects delivered</p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6">
                  <p className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter mb-1">98%</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Client satisfaction</p>
                </div>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6">
                <p className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter mb-1">5+</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Years of experience</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Our team brings deep expertise across design, engineering, and strategy — so you get a partner, not just a vendor.
                </p>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
};

export default About;