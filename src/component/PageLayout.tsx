import React from 'react';

type TypeProps = {
  className?: string;
  children?: React.ReactNode;
};

const Layout: React.FC<TypeProps> = (props) => (
  <div className={`container mx-auto h-screen relative pb-14 ${props.className}`}>
    {props.children}
  </div>
);

export const PageLayout = React.memo<TypeProps>(Layout);
