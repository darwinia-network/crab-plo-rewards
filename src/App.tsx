import React from 'react';
import './App.css';
import { Button, Statistic } from 'antd';
import { useQuery } from "@apollo/client";
import { RewardsTable } from './component/RewardsTable';
import { downloadCsv, getCsvRowsAndTableData } from './utils';
import { GET_USERS_CONTRIBUTE_POWER } from './config';

function App() {
  const { loading, error, data, refetch } = useQuery(GET_USERS_CONTRIBUTE_POWER, {
    variables: {
      first: 20,
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
  } = getCsvRowsAndTableData(data?.crowdloanWhoStatistics?.nodes || []);

  const handleClickFetchAll = () => {
    refetch({ first: 0, offset: 0 });
  }

  const handleClickDownload = () => {
    downloadCsv(csvRows.map(e => e.join(",")).join("\n"));
  }

  return (
    <div className='container mx-auto pt-10 h-screen relative pb-14'>
      <div className='flex items-end justify-end space-x-24 mb-8'>
        <div className='flex items-center space-x-6'>
          <Statistic title="Total Current CRAB" value={totalCurrentCRab.toFixed(8)} />
          <Statistic title="Total Current CKTON" value={totalCurrentCKton.toFixed(8)} />
          <Statistic title="Total Stage CRAB" value={totalStageCRab.toFixed(8)} />
          <Statistic title="Total Stage CKTON" value={totalStageCKTON.toFixed(8)} />
        </div>

        <div className='flex justify-end items-end space-x-2'>
          <Button className='rounded-md' onClick={handleClickFetchAll} disabled={data?.crowdloanWhoStatistics?.pageInfo?.hasNextPage === false} loading={loading} type='primary'>
            Fetch All ({data?.crowdloanWhoStatistics?.nodes.length || 0}/{data?.crowdloanWhoStatistics?.totalCount || 0})
          </Button>
          <Button className='rounded-md' onClick={handleClickDownload} disabled={csvRows.length === 0} loading={loading}>Download CSV</Button>
        </div>
      </div>

      <RewardsTable
        loading={loading}
        dataSource={rewardsTableDataSource}
      />

      <p className='absolute top-auto bottom-4 w-full text-center space-x-3'>
        <span>Copyright©2022</span>
        <span>|</span>
        <a href='https://github.com/darwinia-network/crab-plo-rewards' target='_blank' rel='noopener noreferrer'>Github</a>
        <span>|</span>
        <a href='https://crab.network/plo_contribute' target='_blank' rel='noopener noreferrer'>PLO</a>
      </p>
    </div>
  );
}

export default React.memo(App);
