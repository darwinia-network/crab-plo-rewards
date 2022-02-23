import React, { useState } from 'react';
import { useApolloClient, ApolloError } from "@apollo/client";
import { GET_USER_NFT_CLAIMED } from '../../config';
import  { NftTable } from './NftTable';
import { PageLayout, PageContent, PageFooter } from '../../component';
import { downloadCsv, transformNftsData } from '../../utils';
import { Button, Statistic, Breadcrumb } from 'antd';
import { data as nftEligibleData } from './data';
import type { TypeGetUserNftClaimedNode } from '../../type';
import { useNavigate } from 'react-router-dom';

const Page: React.FC = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApolloError | undefined>(undefined);

  const { csvRows, nftTableDataSource } = transformNftsData(nftEligibleData, []);

  const getUsersNftClaimed = async (users: string[]): Promise<TypeGetUserNftClaimedNode[]> => {
    const result: TypeGetUserNftClaimedNode[] = [];

    try {
      setLoading(true);
      for (let user of users) {
        const { data } = await client.query({
          query: GET_USER_NFT_CLAIMED,
          variables: {
            user: user,
          },
        });
        data?.remarkedNftAddresses?.nodes?.length && result.push(data?.remarkedNftAddresses?.nodes[0]);
      }
    } catch (err) {
      console.error(err);
      setError(err as ApolloError);
    } finally {
      setLoading(false);
    }

    return result;
  };

  const handleClickCheckClaim = () => {
    getUsersNftClaimed([]);
  }

  const handleClickDownload = () => {
    downloadCsv(nftEligibleData.map(e => e.join(',')).join("\n"), 'nft.csv');
  }

  if (error) {
    console.error(error);
    return <p>Oops, something went wrong ~</p>;
  }

  return (
    <PageLayout>
      <PageContent>
        <div className='flex items-end justify-end space-x-24 mb-2'>
          <div className='flex items-center space-x-6'>
            <Statistic loading={loading} title="Total NFT Eligible" value={nftEligibleData.length} />
            <Statistic loading={loading} title="Total Claimed" value={123} />
            <Statistic loading={loading} title="Total Unclaimed" value={123} />
          </div>
          <div className='flex justify-end items-end space-x-2'>
            <Button className='rounded-md' onClick={handleClickCheckClaim} disabled={true} loading={loading} type='primary'>
              Check Claim
            </Button>
            <Button className='rounded-md' onClick={handleClickDownload} disabled={csvRows.length >= 0} loading={loading}>Download CSV</Button>
          </div>
        </div>
        <Breadcrumb className='pl-px pb-1'>
          <Breadcrumb.Item className='antd-breadcrumb-item' onClick={() => navigate('/')}>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Rewards</Breadcrumb.Item>
        </Breadcrumb>
        <NftTable loading={loading} dataSource={nftTableDataSource} />
      </PageContent>
      <PageFooter />
    </PageLayout>
  );
};

export const NftPage = React.memo(Page);
