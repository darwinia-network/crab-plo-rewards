import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PageLoading } from './component/PageLoading';
import { ApiProvider } from './provider';

const crabRewardsGqlClient = new ApolloClient({
  uri: 'https://api.subquery.network/sq/darwinia-network/home-plo-kusama',
  cache: new InMemoryCache(),
});

const crabNftClaimGqlClient = new ApolloClient({
  uri: 'https://api.subquery.network/sq/darwinia-network/crab-plo-nft',
  cache: new InMemoryCache(),
});

const darwiniaNftClaimGqlClient = new ApolloClient({
  uri: 'https://api.subquery.network/sq/darwinia-network/darwinia-nft-polkadot',
  cache: new InMemoryCache(),
});

const AsyncHomePage = React.lazy(() => import('./page/home'));
const AsyncCrabNftPage = React.lazy(() => import('./page/crab-nft'));
const AsyncCrabRewardsPower = React.lazy(() => import('./page/crab-rewards'));
const AsyncDarwiniaNftPage = React.lazy(() => import('./page/darwinia-nft'));
const AsyncCrabAirdropPage = React.lazy(() => import('./page/crab-airdrop'));

const AsyncCrabNftPageWithGql: React.FC = () => (
  <ApolloProvider client={crabNftClaimGqlClient}>
    <AsyncCrabNftPage />
  </ApolloProvider>
);

const AsyncCrabRewardsPageWithGql: React.FC = () => (
  <ApolloProvider client={crabRewardsGqlClient}>
    <AsyncCrabRewardsPower />
  </ApolloProvider>
);

const AsyncDarwiniaNftPageWithGql: React.FC = () => (
  <ApolloProvider client={darwiniaNftClaimGqlClient}>
    <AsyncDarwiniaNftPage />
  </ApolloProvider>
);

const AsyncCrabAirdropPageWithApiProvider: React.FC = () => (
  <ApiProvider>
    <AsyncCrabAirdropPage />
  </ApiProvider>
);

export const Router: React.FC = () => (
  <React.Suspense fallback={<PageLoading />}>
    <Routes>
      <Route index element={<AsyncHomePage />} />
      <Route path="crab/nft" element={<AsyncCrabNftPageWithGql />} />
      <Route path="crab/rewards" element={<AsyncCrabRewardsPageWithGql />} />
      <Route path="darwinia/nft" element={<AsyncDarwiniaNftPageWithGql />} />
      <Route path="crab/airdrop" element={<AsyncCrabAirdropPageWithApiProvider />} />
      <Route path="*" element={<p className="py-1 px-2">There's nothing here !</p>} />
    </Routes>
  </React.Suspense>
);
