import React from 'react';

type TypeProps = {
  className?: string;
  children?: React.ReactNode;
};

const Content: React.FC<TypeProps> = (props) => (
  <div className={`pt-10 page-content-height ${props.className}`}>
    {props.children}
  </div>
);

export const PageContent = React.memo<TypeProps>(Content);
