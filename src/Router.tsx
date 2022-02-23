import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SuspenseLoading } from './component/SuspensLoading';

const rewardsGqlClient = new ApolloClient({
  uri: "https://api.subquery.network/sq/darwinia-network/home-plo-kusama",
  cache: new InMemoryCache(),
});

const nftClaimGqlClient = new ApolloClient({
  uri: "https://api.subquery.network/sq/darwinia-network/crab-plo-nft__ZGFyd",
  cache: new InMemoryCache(),
});

const AsyncHomePage = React.lazy(() => import('./page/home'));
const AsyncNftPage = React.lazy(() => import('./page/nft'));
const AsyncRewardsPower = React.lazy(() => import('./page/rewards'));

const AsyncNftPageWithGql: React.FC = () => (
  <ApolloProvider client={nftClaimGqlClient}>
    <AsyncNftPage />
  </ApolloProvider>
);

const AsyncRewardsPageWithGql: React.FC = () => (
  <ApolloProvider client={rewardsGqlClient}>
    <AsyncRewardsPower />
  </ApolloProvider>
);

export const Router: React.FC = () => (
  <React.Suspense fallback={<SuspenseLoading />}>
    <Routes>
      <Route index element={<AsyncHomePage />} />
      <Route path='nft' element={<AsyncNftPageWithGql />} />
      <Route path='rewards' element={<AsyncRewardsPageWithGql />} />
      <Route path='*' element={<p className='py-1 px-2'>There's nothing here !</p>} />
    </Routes>
  </React.Suspense>
);
