import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { HomePage } from './page/home';
import { NftPage } from './page/nft';
import { RewardsPage } from './page/rewards';

const rewardsGqlClient = new ApolloClient({
  uri: "https://api.subquery.network/sq/darwinia-network/home-plo-kusama",
  cache: new InMemoryCache(),
});

const nftClaimGqlClient = new ApolloClient({
  uri: "https://api.subquery.network/sq/darwinia-network/crab-plo-nft__ZGFyd",
  cache: new InMemoryCache(),
});

const NftPageWithGql: React.FC = () => (
  <ApolloProvider client={nftClaimGqlClient}>
    <NftPage />
  </ApolloProvider>
);

const RewardsPageWithGql: React.FC = () => (
  <ApolloProvider client={rewardsGqlClient}>
    <RewardsPage />
  </ApolloProvider>
);

export const Router: React.FC = () => (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path='nft' element={<NftPageWithGql />} />
    <Route path='rewards' element={<RewardsPageWithGql />} />
    <Route path='*' element={<p className='py-1 px-2'>There's nothing here !</p>} />
  </Routes>
);
