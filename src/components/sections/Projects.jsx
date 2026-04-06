import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import projectService from '../../api/services/projectService';

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 6;

const optimizeImage = (url, width = 800) => {
  if (!url) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

/* ── Skeleton ── */
const ProjectsSkeleton = () => (
  <div className="space-y-5">
    <div className="w-full h-[460px] bg-neutral-100 dark:bg-neutral-800 rounded-3xl animate-pulse" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
          <div className="h-52 bg-neutral-100 dark:bg-neutral-800" />
          <div className="p-5 space-y-2 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 border-t-0 rounded-b-2xl">
            <div className="h-4 w-2/3 bg-neutral-100 dark:bg-neutral-800 rounded" />
            <div className="h-3 w-full bg-neutral-100 dark:bg-neutral-800 rounded" />
            <div className="h-3 w-4/5 bg-neutral-100 dark:bg-neutral-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Hero Card (first project) ── */
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
        <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase text-white"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          Featured
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
        <h3 className="text-white font-black tracking-tight leading-tight mb-3"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'Playfair Display', Georgia, serif" }}>
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

/* ── Small Card ── */
const SmallCard = ({ project }) => {
  const img = project.imgUrls?.[0];
  return (
    <div className="group bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300">
      <div className="relative h-52 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        {img ? (
          <img
            src={optimizeImage(img, 600)}
            alt={project.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black text-5xl text-neutral-300 dark:text-neutral-700"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {project.name?.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-1.5 line-clamp-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {project.name}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-3">
          {project.description}
        </p>
        {(project.startedFrom || project.endedFrom) && (
          <p className="text-[11px] text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">
            {formatDate(project.startedFrom)}
            {project.startedFrom && project.endedFrom && ' — '}
            {formatDate(project.endedFrom)}
          </p>
        )}
      </div>
    </div>
  );
};

/* ── Main Component ── */
const Projects = () => {
  const { data, loading, error, execute } = useApi(projectService.getActive);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => { execute(); }, []);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(c => c + LOAD_MORE_COUNT);
      setLoadingMore(false);
    }, 350);
  };

  const visible = data ? data.slice(0, visibleCount) : [];
  const hero = visible[0];
  const rest = visible.slice(1);
  const hasMore = data && visibleCount < data.length;

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');`}</style>

      <section id="projects" className="py-24 px-6 bg-white dark:bg-neutral-950 transition-colors duration-200">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-14">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-neutral-400 dark:text-neutral-500 mb-2">
              Our Work
            </p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-neutral-900 dark:text-white leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Projects
            </h2>
          </div>

          {/* Loading */}
          {loading && <ProjectsSkeleton />}

          {/* Error */}
          {error && (
            <div className="text-center py-20">
              <p className="text-sm text-neutral-400 mb-3">Could not load projects.</p>
              <button onClick={() => execute()}
                className="text-sm text-neutral-900 dark:text-white underline underline-offset-4 bg-transparent border-0 cursor-pointer">
                Try again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && data?.length === 0 && (
            <div className="text-center py-20 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <p className="text-neutral-400 dark:text-neutral-600 text-sm">Projects coming soon.</p>
            </div>
          )}

          {/* Projects */}
          {!loading && !error && data?.length > 0 && (
            <div className="space-y-5">

              {/* Hero — first project */}
              {hero && <HeroCard project={hero} />}

              {/* 3-col grid — remaining projects */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map(project => (
                    <SmallCard key={project.id} project={project} />
                  ))}
                </div>
              )}

              {/* See More button */}
              {hasMore && (
                <div className="flex justify-center pt-10">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2.5 px-9 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-200 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Loading…
                      </>
                    ) : (
                      <>
                        See more projects
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* All loaded message */}
              {!hasMore && data.length > INITIAL_COUNT && (
                <p className="text-center text-xs text-neutral-400 dark:text-neutral-600 pt-8 tracking-widest uppercase">
                  All {data.length} projects loaded
                </p>
              )}

            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Projects;