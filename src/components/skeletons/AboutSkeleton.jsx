import React from 'react'
import Skeleton from './ui/Skeleton.jsx'

const AboutSkeleton = () => {
  
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
    <Skeleton width="120px" height="120px" borderRadius="50%" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Skeleton width="40%" height="1.5rem" />
      <Skeleton width="25%" height="1rem" />
      <Skeleton width="100%" height="1rem" />
      <Skeleton width="90%"  height="1rem" />
      <Skeleton width="80%"  height="1rem" />
    </div>
  </div>
  
}

export default AboutSkeleton
