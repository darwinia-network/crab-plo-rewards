import React from 'react';
import { Button, Statistic, Breadcrumb } from 'antd';
import { useQuery } from "@apollo/client";
import { RewardsTable } from './RewardsTable';
import { PageLayout, PageContent, PageFooter } from '../../component';
import { downloadCsv, transformRewardsData } from '../../utils';
import { GET_USERS_CONTRIBUTE_POWER } from '../../config';

const Page: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS_CONTRIBUTE_POWER, {
    variables: {
      first: 2,
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    console.error(error);
    return <p>Oops, something went wrong ~</p>;
  }
  const {
    csvRows, rewardsTableDataSource,
    totalCurrentCRab, totalCurrentCKton,
    totalStageCRab, totalStageCKTON
  } = transformRewardsData(data?.crowdloanWhoStatistics?.nodes || []);

  const handleClickFetchAll = () => {
    refetch({ first: 6, offset: 0 });
  }

  const handleClickDownload = () => {
    downloadCsv(csvRows.map(e => e.join(",")).join("\n"));
  }

  return (
    <PageLayout>
      <PageContent>
        <div className='flex items-end justify-end space-x-24 mb-2'>
          <div className='flex items-center space-x-6'>
            <Statistic loading={loading} title="Total Current CRAB" value={totalCurrentCRab.toFixed(8)} />
            <Statistic loading={loading} title="Total Current CKTON" value={totalCurrentCKton.toFixed(8)} />
            <Statistic loading={loading} title="Total Stage CRAB" value={totalStageCRab.toFixed(8)} />
            <Statistic loading={loading} title="Total Stage CKTON" value={totalStageCKTON.toFixed(8)} />
          </div>

          <div className='flex justify-end items-end space-x-2'>
            <Button className='rounded-md' onClick={handleClickFetchAll} disabled={data?.crowdloanWhoStatistics?.pageInfo?.hasNextPage === false} loading={loading} type='primary'>
              Fetch All ({data?.crowdloanWhoStatistics?.nodes.length || 0}/{data?.crowdloanWhoStatistics?.totalCount || 0})
            </Button>
            <Button className='rounded-md' onClick={handleClickDownload} disabled={csvRows.length === 0} loading={loading}>Download CSV</Button>
          </div>
        </div>

        <Breadcrumb className='pl-px pb-1'>
          <Breadcrumb.Item href={process.env.PUBLIC_URL}>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Rewards</Breadcrumb.Item>
        </Breadcrumb>

        <RewardsTable
          loading={loading}
          dataSource={rewardsTableDataSource}
        />
      </PageContent>

      <PageFooter />
    </PageLayout>
  );
};

export const RewardsPage = React.memo(Page);
