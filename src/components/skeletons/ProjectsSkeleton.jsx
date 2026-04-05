// components/skeletons/ProjectsSkeleton.jsx
import Skeleton from '../ui/Skeleton';

const ProjectCard = () => (
  <div style={{
    border: '0.5px solid var(--color-border-tertiary)',
    borderRadius: 'var(--border-radius-lg)',
    overflow: 'hidden',
  }}>
    <Skeleton width="100%" height="200px" borderRadius="0" />
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Skeleton width="70%" height="1.1rem" />
      <Skeleton width="100%" height="0.9rem" />
      <Skeleton width="40%" height="0.9rem" />
      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <Skeleton width="60px" height="24px" borderRadius="20px" />
        <Skeleton width="60px" height="24px" borderRadius="20px" />
      </div>
    </div>
  </div>
);

const ProjectsSkeleton = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
    <ProjectCard /><ProjectCard />
    <ProjectCard /><ProjectCard />
  </div>
);

export default ProjectsSkeleton;