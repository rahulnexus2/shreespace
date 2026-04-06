import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import serviceService from '../../api/services/serviceService';
import { SERVICE_ICONS } from '../../utils/constants';

const INITIAL_COUNT = 10;

const optimizeImage = (url) => {
  if (!url) return url;
  return url.replace('/upload/', '/upload/f_auto,q_auto,w_600/');
};

const ServicesSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
        <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 animate-pulse flex-shrink-0" />
        <div className="flex-1">
          <div className="h-3.5 w-1/3 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse mb-2" />
          <div className="h-3 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const Services = () => {
  const { data, loading, error, execute } = useApi(serviceService.getActive);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    execute();
  }, []);

  const visibleServices = showAll ? data : data?.slice(0, INITIAL_COUNT);
  const hasMore = data?.length > INITIAL_COUNT;

  return (
    <section id="services" className="py-24 px-6 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">

        {/* header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-white mb-3">
            Our Services
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-base">
            Comprehensive digital solutions tailored to your needs
          </p>
        </div>

        {loading && <ServicesSkeleton />}

        {error && (
          <div className="text-center py-16 text-neutral-400 dark:text-neutral-600">
            <p className="text-sm">Could not load services.</p>
            <button
              onClick={() => execute()}
              className="mt-4 text-sm text-neutral-900 dark:text-white underline cursor-pointer bg-transparent border-0"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {visibleServices.map(service => (
                <div
                  key={service.id}
                  className="flex items-start gap-4 p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-sm transition-all duration-200 cursor-default"
                >
                  {/* icon */}
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                    {service.imgUrl ? (
                      <img
                        loading="lazy"
                        src={optimizeImage(service.imgUrl)}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-900 dark:bg-white flex items-center justify-center text-lg rounded-xl">
                        {SERVICE_ICONS[service.title] || '⚙️'}
                      </div>
                    )}
                  </div>

                  {/* text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(prev => !prev)}
                  className="px-8 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer bg-transparent"
                >
                  {showAll ? 'Show Less ↑' : `See All Services (${data.length - INITIAL_COUNT} more) ↓`}
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};

export default Services;