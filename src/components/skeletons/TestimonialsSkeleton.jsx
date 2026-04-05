// components/skeletons/TestimonialsSkeleton.jsx
import Skeleton from '../ui/Skeleton';

const TestimonialCard = () => (
  <div style={{
    minWidth: '280px',
    padding: '1.5rem',
    border: '0.5px solid var(--color-border-tertiary)',
    borderRadius: 'var(--border-radius-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }}>
    <Skeleton width="100%" height="0.9rem" />
    <Skeleton width="100%" height="0.9rem" />
    <Skeleton width="70%"  height="0.9rem" />
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
      <Skeleton width="40px" height="40px" borderRadius="50%" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Skeleton width="100px" height="0.9rem" />
        <Skeleton width="70px"  height="0.8rem" />
      </div>
    </div>
  </div>
);

const TestimonialsSkeleton = () => (
  <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'hidden' }}>
    <TestimonialCard /><TestimonialCard /><TestimonialCard />
  </div>
);

export default TestimonialsSkeleton;