import { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import serviceService from '../../api/services/serviceService';
import { SERVICE_ICONS } from '../../utils/constants';

const ServicesSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
        <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 animate-pulse mb-6"/>
        <div className="h-4 w-2/3 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse mb-3"/>
        <div className="h-3 w-full bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse mb-2"/>
        <div className="h-3 w-4/5 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse"/>
      </div>
    ))}
  </div>
);

const Services = () => {
  const { data, loading, error, execute } = useApi(serviceService.getActive);

  useEffect(() => {
    execute();
  }, []);


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

        {/* loading */}
        {loading && <ServicesSkeleton />}

        {/* error */}
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

        {/* grid */}
        {!loading && !error && data && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {data.map(service => (
      <div
        key={service.id}
        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-neutral-900 transition-all duration-200 cursor-default"
      >
        <div className="w-14 h-14 rounded-2xl overflow-hidden mb-6 flex-shrink-0">
          {service.imgUrl ? (
            <img
              src={service.imgUrl}
              alt={service.title}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full h-full bg-neutral-900 dark:bg-white flex items-center justify-center text-2xl rounded-2xl">
              {SERVICE_ICONS[service.title] || '⚙️'}
            </div>
          )}
        </div>
        <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {service.description}
        </p>
      </div>
    ))}
  </div>
)}

      </div>
    </section>
  );
};

export default Services;