import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout, PageContent, PageFooter } from '../../component';

type TypeCustomLink = {
  to: string;
  text: string;
};

const CustomLink: React.FC<TypeCustomLink> = (props) => (
  <Link
    to={props.to}
    className="rounded-xl w-80 h-32 flex justify-center items-center transition-transform duration-300 hover:scale-110 text-lg font-black text-blue-400 nav-link"
  >
    <span className="mr-5">{props.text}</span>
  </Link>
);

const Page: React.FC = () => {
  return (
    <PageLayout>
      <PageContent className="flex items-center justify-center">
        <nav className="flex flex-col space-y-7 pb-32">
          <CustomLink to="/crab/nft" text="Crab NFT" />
          <CustomLink to="/darwinia/nft" text="Darwinia NFT" />
          <CustomLink to="/crab/rewards" text="Darwinia Rewards" />
        </nav>
      </PageContent>
      <PageFooter />
    </PageLayout>
  );
};

export default React.memo(Page);
