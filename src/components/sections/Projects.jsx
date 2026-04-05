import { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import projectService from '../../api/services/projectService';

const ProjectsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {[...Array(2)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
        <div className="h-56 bg-neutral-100 dark:bg-neutral-800 animate-pulse"/>
        <div className="p-6 flex flex-col gap-3">
          <div className="h-4 w-2/3 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse"/>
          <div className="h-3 w-full bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse"/>
          <div className="h-3 w-4/5 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse"/>
          <div className="h-3 w-3/5 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse"/>
        </div>
      </div>
    ))}
  </div>
);

const optimizeImage = (url) => {
  if (!url) return url;
  return url.replace('/upload/', '/upload/f_auto,q_auto,w_600/');
};



const Projects = () => {
  const { data, loading, error, execute } = useApi(projectService.getActive);

  useEffect(() => {
    execute();
  }, []);


  const formatYear = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).getFullYear();
  };

  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-neutral-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">

        {/* header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-white mb-3">
            Our Projects
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-base">
            A selection of work we're proud of
          </p>
        </div>

        {/* loading */}
        {loading && <ProjectsSkeleton />}

        {/* error */}
        {error && (
          <div className="text-center py-16 text-neutral-400 dark:text-neutral-600">
            <p className="text-sm">Could not load projects.</p>
            <button
              onClick={() => execute()}
              className="mt-4 text-sm text-neutral-900 dark:text-white underline cursor-pointer bg-transparent border-0"
            >
              Try again
            </button>
          </div>
        )}

        {/* empty */}
        {!loading && !error && data && data.length === 0 && (
          <div className="text-center py-16 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
            <p className="text-neutral-400 dark:text-neutral-600 text-sm">
              Projects coming soon.
            </p>
          </div>
        )}

        {/* grid */}
 {!loading && !error && data && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {data.map(project => {
      const img = project.imgUrls?.[0];  

      return (
        <div
          key={project.id}
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-neutral-900 transition-all duration-200 cursor-default"
        >
          {/* thumbnail */}
          <div className="h-40 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
            {img
              ? <img src={optimizeImage(img)} alt={project.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              : <span className="text-4xl font-black text-neutral-300 dark:text-neutral-700">
                  {project.name?.slice(0, 2).toUpperCase()}
                </span>
            }
          </div>

          {/* body */}
          <div className="p-6">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              {project.name}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
              {project.description}
            </p>
            {(project.startedFrom || project.endedFrom) && (
              <div className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-600">
                {project.startedFrom && (
                  <span>
                    {new Date(project.startedFrom).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </span>
                )}
                {project.startedFrom && project.endedFrom && <span>–</span>}
                {project.endedFrom && (
                  <span>
                    {new Date(project.endedFrom).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
)}

      </div>
    </section>
  );
};

export default Projects;