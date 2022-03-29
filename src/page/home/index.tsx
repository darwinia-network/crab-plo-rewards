import React from 'react';
import { Link } from 'react-router-dom';

type TypeCustomLink = {
  to: string;
  text: string;
};

const CustomLink: React.FC<TypeCustomLink> = (props) => (
  <Link
    to={props.to}
    className="rounded-xl w-80 h-32 flex justify-center items-center transition-transform duration-300 hover:scale-110 text-2xl font-black text-blue-400 nav-link"
  >
    {props.text}
  </Link>
);

const Page: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <nav className="flex flex-col space-y-7 pb-32">
        <CustomLink to="/rewards" text="Rewards" />
        <CustomLink to="/nft" text="PLO NFT" />
      </nav>
    </div>
  );
};

export default React.memo(Page);
