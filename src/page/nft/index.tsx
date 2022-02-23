import React, { useState } from 'react';
import { useApolloClient } from "@apollo/client";
import { GET_USERS_NFT_CLAIMED } from '../../config';
import  { NftTable } from './NftTable';
import { PageLayout, PageContent, PageFooter } from '../../component';
import { downloadCsv, transformNftsData } from '../../utils';
import { Button, Statistic, Breadcrumb, notification } from 'antd';
import { data as nftEligibleData } from './data';
import type { TypeNftTableDataSource, TypeGetUsersNftClaimed } from '../../type';
import { useNavigate } from 'react-router-dom';

const Page: React.FC = () => {
  const navigate = useNavigate();
  const client = useApolloClient();

  const [csvRows, setCsvRows] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [disabledCheck, setDisabledCheck] = useState(false);
  const [nftTableDataSource, setNftTableDataSource] = useState<TypeNftTableDataSource[]>([]);

  const getUsersNftClaimed = async (offset: number): Promise<TypeGetUsersNftClaimed> => {
    const result: TypeGetUsersNftClaimed = { totalCount: 0, pageInfo: { hasNextPage: false }, nodes: [] };
    try {
      const { data } = await client.query({
        variables: {
          first: 50,
          offset: offset,
        },
        query: GET_USERS_NFT_CLAIMED,
      });
      result.totalCount = data?.remarkedNftAddresses?.totalCount || 0;
      result.pageInfo = data?.remarkedNftAddresses?.pageInfo || { hasNextPage: false };
      result.nodes = result.nodes.concat(data?.remarkedNftAddresses?.nodes || []);
    } catch (err) {
      console.error(err);
      notification.warning({
        message: 'Oops, something went wrong',
        description: (err as Error).message,
      });
    }
    return result;
  };

  const handleClickCheckClaim = async () => {
    setLoading(true);

    const claimeds = await getUsersNftClaimed(0);
    while (claimeds.pageInfo.hasNextPage) {
      const c = await getUsersNftClaimed(claimeds.nodes.length);
      if (c.totalCount === 0 || c.nodes.length === 0) { break; }
      claimeds.totalCount = c.totalCount;
      claimeds.pageInfo = c.pageInfo;
      claimeds.nodes = claimeds.nodes.concat(c.nodes);
    }

    const transformed = transformNftsData(nftEligibleData, claimeds.nodes);
    setCsvRows(transformed.csvRows);
    setNftTableDataSource(transformed.nftTableDataSource);

    setDisabledCheck(true);
    setLoading(false);
  };

  const handleClickDownload = () => {
    downloadCsv(csvRows.join("\n"), 'nftclaimeds.csv');
  };

  return (
    <PageLayout>
      <PageContent>
        <div className='flex items-end justify-end space-x-24 mb-2'>
          <div className='flex items-center space-x-6'>
            <Statistic loading={loading} title="Total NFT Eligible" value={nftEligibleData.length} />
            <Statistic loading={loading} title="Total Claimed" value={csvRows.length} />
            <Statistic loading={loading} title="Total Unclaimed" value={nftEligibleData.length - csvRows.length} />
          </div>
          <div className='flex justify-end items-end space-x-2'>
            <Button className='rounded-md' onClick={handleClickCheckClaim} disabled={disabledCheck} loading={loading} type='primary'>
              Check Claim
            </Button>
            <Button className='rounded-md' onClick={handleClickDownload} disabled={csvRows.length === 0} loading={loading}>Download CSV</Button>
          </div>
        </div>
        <Breadcrumb className='pl-px pb-1'>
          <Breadcrumb.Item className='antd-breadcrumb-item' onClick={() => navigate('/')}>Home</Breadcrumb.Item>
          <Breadcrumb.Item>NFT</Breadcrumb.Item>
        </Breadcrumb>
        <NftTable loading={loading} dataSource={nftTableDataSource} />
      </PageContent>
      <PageFooter />
    </PageLayout>
  );
};

export default React.memo(Page);
