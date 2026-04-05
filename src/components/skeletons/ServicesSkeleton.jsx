// components/skeletons/ServicesSkeleton.jsx
import Skeleton from '../ui/Skeleton';

const ServiceCard = () => (
  <div style={{
    padding: '1.5rem',
    border: '0.5px solid var(--color-border-tertiary)',
    borderRadius: 'var(--border-radius-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }}>
    <Skeleton width="40px"  height="40px" borderRadius="8px" />
    <Skeleton width="60%"   height="1.1rem" />
    <Skeleton width="100%"  height="0.9rem" />
    <Skeleton width="85%"   height="0.9rem" />
    <Skeleton width="30%"   height="0.9rem" />
  </div>
);

const ServicesSkeleton = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
    <ServiceCard /><ServiceCard /><ServiceCard />
  </div>
);

export default ServicesSkeleton;