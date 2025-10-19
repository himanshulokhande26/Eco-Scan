import React from 'react';

export const LeafIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L6 23l2 .5-1-2.5C9 17 12 14 17 12V8z" />
    <path d="M17 8a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
);

export const CameraIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const SmartClassificationIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.591 9.255a1.5 1.5 0 00-2.012 2.333l1.24 1.5c.42.513 1.185.642 1.776.324l2.028-1.127a1.5 1.5 0 00-1.032-2.73z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.429 13.988a1.5 1.5 0 00-2.333-2.012l-1.5 1.24a.6.6 0 01-.68.04l-2.028-1.127a1.5 1.5 0 00-2.73 1.032l.334 2.787a.6.6 0 00.56.52l2.428.347a1.5 1.5 0 001.68-.324l1.5-1.24a1.5 1.5 0 00.68-.04z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.25 12a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
  </svg>
);


export const RecycleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,4C9.2,4,6.7,5.5,5.4,7.8L4,6.4V12h5.6L7.9,10.3C8.9,8.7,10.3,8,12,8c3.3,0,6,2.7,6,6s-2.7,6-6,6 c-2.1,0-4-1.1-5.1-2.7l-1.5,0.8C6.9,19.9,9.3,21,12,21c4.4,0,8-3.6,8-8S16.4,4,12,4z"/>
  </svg>
);

export const CompostIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
   <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 22h20V2L2 22zm3-4h4v-4H5v4zm5 0h4v-4h-4v4zm5 0h4v-4h-4v4zM5 12h4V8H5v4zm5 0h4V8h-4v4zm5 0h4V8h-4v4z" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);