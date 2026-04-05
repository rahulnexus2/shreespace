// components/skeletons/ContactSkeleton.jsx
import Skeleton from '../ui/Skeleton';

const ContactSkeleton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '560px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      <Skeleton height="42px" borderRadius="8px" />
      <Skeleton height="42px" borderRadius="8px" />
    </div>
    <Skeleton height="42px" borderRadius="8px" />
    <Skeleton height="42px" borderRadius="8px" />
    <Skeleton height="120px" borderRadius="8px" />
    <Skeleton width="140px" height="42px" borderRadius="8px" />
  </div>
);

export default ContactSkeleton;