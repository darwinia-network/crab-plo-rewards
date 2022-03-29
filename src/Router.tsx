import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SuspenseLoading } from './component/SuspensLoading';

const rewardsGqlClient = new ApolloClient({
  uri: 'https://api.subquery.network/sq/darwinia-network/home-plo-kusama',
  cache: new InMemoryCache(),
});

const nftClaimGqlClient = new ApolloClient({
  uri: 'https://api.subquery.network/sq/darwinia-network/crab-plo-nft',
  cache: new InMemoryCache(),
});

const AsyncHomePage = React.lazy(() => import('./page/home'));
const AsyncCrabNftPage = React.lazy(() => import('./page/crab-nft'));
const AsyncCrabRewardsPower = React.lazy(() => import('./page/crab-rewards'));

const AsyncCrabNftPageWithGql: React.FC = () => (
  <ApolloProvider client={nftClaimGqlClient}>
    <AsyncCrabNftPage />
  </ApolloProvider>
);

const AsyncCrabRewardsPageWithGql: React.FC = () => (
  <ApolloProvider client={rewardsGqlClient}>
    <AsyncCrabRewardsPower />
  </ApolloProvider>
);

export const Router: React.FC = () => (
  <React.Suspense fallback={<SuspenseLoading />}>
    <Routes>
      <Route index element={<AsyncHomePage />} />
      <Route path="crab/nft" element={<AsyncCrabNftPageWithGql />} />
      <Route path="crab/rewards" element={<AsyncCrabRewardsPageWithGql />} />
      <Route path="*" element={<p className="py-1 px-2">There's nothing here !</p>} />
    </Routes>
  </React.Suspense>
);
