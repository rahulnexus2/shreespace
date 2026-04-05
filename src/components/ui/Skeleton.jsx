// components/ui/Skeleton.jsx
const Skeleton = ({ width = '100%', height = '1rem', borderRadius = '6px', style = {} }) => (
  <div style={{
    width,
    height,
    borderRadius,
    background: 'var(--color-background-secondary)',
    animation: 'skeleton-pulse 1.5s ease-in-out infinite',
    ...style,
  }} />
);

export default Skeleton;