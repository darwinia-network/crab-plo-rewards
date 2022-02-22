import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_USERS_CONTRIBUTE_BALANCE } from '../../config';
import  { NftTable } from './NftTable';
import { PageLayout, PageContent, PageFooter } from '../../component';
import { downloadCsv, transformNftsData } from '../../utils';
import { Button } from 'antd';

const Page: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS_CONTRIBUTE_BALANCE, {
    variables: {
      first: 10,
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    console.error(error);
    return <p>Oops, something went wrong ~</p>;
  }

  const { csvRows, nftTableDataSource } = transformNftsData(data?.crowdloanWhoStatistics?.nodes || []);

  const handleClickFetchAll = () => {
    refetch({ first: 0, offset: 0 });
  }

  const handleClickDownload = () => {
    downloadCsv(csvRows.map(e => e.join(',')).join("\n"), 'nft.csv');
  }

  return (
    <PageLayout>
      <PageContent>
        <div className='flex items-end justify-end space-x-24 mb-2'>
          <div className='flex justify-end items-end space-x-2'>
            <Button className='rounded-md' onClick={handleClickFetchAll} disabled={data?.crowdloanWhoStatistics?.pageInfo?.hasNextPage === false} loading={loading} type='primary'>
              Fetch All ({data?.crowdloanWhoStatistics?.nodes.length || 0}/{data?.crowdloanWhoStatistics?.totalCount || 0})
            </Button>
            <Button className='rounded-md' onClick={handleClickDownload} disabled={csvRows.length === 0} loading={loading}>Download CSV</Button>
          </div>
        </div>
        <NftTable loading={loading} dataSource={nftTableDataSource} />
      </PageContent>
      <PageFooter />
    </PageLayout>
  );
};

export const NftPage = React.memo(Page);
