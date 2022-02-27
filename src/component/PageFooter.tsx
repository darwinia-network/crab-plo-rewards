import React from 'react';

export const PageFooter: React.FC = () => (
  <div className='absolute top-auto bottom-0 h-12 w-full flex justify-center items-center space-x-3'>
    <span>Copyright©2022</span>
    <span>|</span>
    <a href='https://github.com/darwinia-network/crab-plo-rewards' target='_blank' rel='noopener noreferrer'>Github</a>
    <span>|</span>
    <a href='https://crab.network/plo_contribute' target='_blank' rel='noopener noreferrer'>PLO</a>
  </div>
);
