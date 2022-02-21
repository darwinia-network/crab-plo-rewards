import React from 'react';
import './App.css';
import { Button, Typography } from 'antd';
import { useQuery } from "@apollo/client";
import { RewardsTable } from './component/RewardsTable';
import { downloadCsv, getCsvRowsAndTableData } from './utils';
import { GET_USERS_CONTRIBUTE_POWER } from './config';

function App() {
  const { loading, error, data, refetch } = useQuery(GET_USERS_CONTRIBUTE_POWER, {
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
  const { csvRows, rewardsTableDataSource } = getCsvRowsAndTableData(data?.crowdloanWhoStatistics?.nodes || []);

  const handleClickFetchAll = () => {
    refetch({ first: 0, offset: 0 });
  }

  const handleClickDownload = () => {
    downloadCsv(csvRows.map(e => e.join(",")).join("\n"));
  }

  return (
    <div className='container mx-auto pt-10 h-screen relative pb-14'>
      <Typography.Paragraph className='text-lg text-center font-bold'>
        Link: <Typography.Link className='italic' underline={true} href='https://crab.network/plo_contribute' target='_blank'>https://crab.network/plo_contribute</Typography.Link>
      </Typography.Paragraph>
      <div className='flex justify-end items-center mb-6 space-x-2'>
        <Button className='rounded-md' onClick={handleClickFetchAll} disabled={data?.crowdloanWhoStatistics?.pageInfo?.hasNextPage === false} loading={loading} type='primary'>
          Fetch All ({data?.crowdloanWhoStatistics?.nodes.length || 0}/{data?.crowdloanWhoStatistics?.totalCount || 0})
        </Button>
        <Button className='rounded-md' onClick={handleClickDownload} disabled={csvRows.length === 0} loading={loading}>Download CSV</Button>
      </div>

      <RewardsTable
        loading={loading}
        dataSource={rewardsTableDataSource}
      />
      <p className='absolute top-auto bottom-4 w-full text-center'><span>Copyright © 2022</span></p>
    </div>
  );
}

export default React.memo(App);
