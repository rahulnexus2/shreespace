import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ServicesContext } from './context/ServicesContext';

const optimizeImage = (url, width = 800) => {
  if (!url) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

/* ── Hero Project Card ── */
const HeroCard = ({ project }) => {
  const img = project.imgUrls?.[0];
  return (
    <div className="relative w-full rounded-3xl overflow-hidden group" style={{ minHeight: '460px' }}>
      {img ? (
        <img
          src={optimizeImage(img, 1400)}
          alt={project.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-950" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      <div className="absolute top-6 left-7">
        <span
          className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase text-white"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          Featured
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            project.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {project.isActive ? 'Active' : 'Completed'}
          </span>
          {project.location && (
            <span className="text-neutral-400 text-xs">📍 {project.location}</span>
          )}
        </div>
        <h3
          className="text-white font-black tracking-tight leading-tight mb-3"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {project.name}
        </h3>
        <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-2 mb-4">
          {project.description}
        </p>
        {(project.startedFrom || project.endedFrom) && (
          <p className="text-neutral-400 text-xs tracking-widest uppercase">
            {formatDate(project.startedFrom)}
            {project.startedFrom && project.endedFrom && ' — '}
            {formatDate(project.endedFrom)}
          </p>
        )}
      </div>
    </div>
  );
};

/* ── Small Project Card ── */
const SmallCard = ({ project }) => {
  const img = project.imgUrls?.[0];
  return (
    <div className="group bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 flex flex-col">
      <div className="relative h-52 bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex-shrink-0">
        {img ? (
          <img
            src={optimizeImage(img, 600)}
            alt={project.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-black text-5xl text-neutral-300 dark:text-neutral-700"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {project.name?.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            project.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          }`}>
            {project.isActive ? 'Active' : 'Completed'}
          </span>
          {project.location && (
            <span className="text-xs text-neutral-400">📍 {project.location}</span>
          )}
        </div>

        <h3
          className="font-bold text-neutral-900 dark:text-white mb-1.5 line-clamp-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {project.name}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-3 flex-1">
          {project.description}
        </p>

        {(project.startedFrom || project.endedFrom) && (
          <p className="text-[11px] text-neutral-400 dark:text-neutral-600 uppercase tracking-widest pt-3 border-t border-neutral-100 dark:border-neutral-800">
            {formatDate(project.startedFrom)}
            {project.startedFrom && project.endedFrom && ' — '}
            {formatDate(project.endedFrom)}
          </p>
        )}
      </div>
    </div>
  );
};

/* ── Main ── */
const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, loading } = useContext(ServicesContext);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 px-6 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto py-24 space-y-5">
          <div className="w-full h-[460px] bg-neutral-100 dark:bg-neutral-800 rounded-3xl animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-neutral-100 dark:bg-neutral-800" />
                <div className="p-5 space-y-2 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 border-t-0 rounded-b-2xl">
                  <div className="h-4 w-2/3 bg-neutral-100 dark:bg-neutral-800 rounded" />
                  <div className="h-3 w-full bg-neutral-100 dark:bg-neutral-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const service = services.find(s => s.id === Number(id));

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-neutral-400">Service not found.</p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold"
        >
          ← Go Home
        </button>
      </div>
    );
  }

  const projects = service.projectDtos ?? [];
  const hero = projects[0];
  const rest = projects.slice(1);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');`}</style>

      <div className="min-h-screen bg-white dark:bg-neutral-950 pt-16 transition-colors duration-200">

        {/* Service Hero Banner */}
        <div
          className="relative min-h-[420px] flex items-end bg-cover bg-center"
          style={{ backgroundImage: `url(${optimizeImage(service.imgUrl, 1400)})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <div className="relative z-10 px-8 md:px-16 pb-14 pt-12 max-w-4xl">
            <button
              onClick={() => navigate(-1)}
              className="mb-5 inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur text-white text-xs cursor-pointer"
            >
              ← Back
            </button>
            <div className="mb-3 inline-block px-4 py-1 rounded-full border border-white/30 bg-white/15 text-white text-xs uppercase tracking-widest">
              Service
            </div>
            <h1
              className="text-white font-black tracking-tight leading-tight mt-3 mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {service.title}
            </h1>
            <p className="text-white/80 text-base leading-relaxed max-w-xl">
              {service.description}
            </p>
          </div>
        </div>

        {/* Projects Section */}
        <section className="max-w-6xl mx-auto px-6 py-20">

          {projects.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <p className="text-neutral-400 dark:text-neutral-600 text-sm">No projects yet for this service.</p>
            </div>
          ) : (
            <>
              <div className="mb-14">
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-neutral-400 dark:text-neutral-500 mb-2">
                  Portfolio
                </p>
                <h2
                  className="text-5xl md:text-6xl font-black tracking-tighter text-neutral-900 dark:text-white leading-none"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Projects
                </h2>
              </div>

              <div className="space-y-5">
                {hero && <HeroCard project={hero} />}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rest.map(project => (
                      <SmallCard key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default ServiceDetail;