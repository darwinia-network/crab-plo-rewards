import React, { useState } from 'react';
import { Button, Statistic, Breadcrumb, notification } from 'antd';
import { useApolloClient } from "@apollo/client";
import { RewardsTable } from './RewardsTable';
import { PageLayout, PageContent, PageFooter } from '../../component';
import { downloadCsv } from '../../utils';
import { GET_CONTRIBUTORS_POWER, GET_REFERRALS_POWER } from '../../config';
import { TypeRewardsTableDataSource } from '../../type';
import { useNavigate } from 'react-router-dom';
import Big from 'big.js';

const Page: React.FC = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [csvRows, setCsvRows] = useState<string[][]>([]);
  const [totalPower, setTotalPower] = useState('0');
  const [totalBalance, setTotalBalance] = useState(Big(0).toFixed(8));
  const [totalStageCRab, setTotalStageCRab] = useState(Big(0).toFixed(8));
  const [totalStageCKton, setTotalStageCKton] = useState(Big(0).toFixed(8));
  const [rewardsTableDataSource, setRewardsTableDataSource] = useState<TypeRewardsTableDataSource[]>([]);

  const handleClickCheckAll = async () => {
    try {
      setLoading(true);

      const powerReferrals = await client.query({
        query: GET_REFERRALS_POWER,
        variables: { first: 0, offset: 0 },
      });
      const powerContributors = await client.query({
        query: GET_CONTRIBUTORS_POWER,
        variables: { first: 0, offset: 0 },
      });

      if (powerReferrals.data?.crowdloanReferStatistics.totalCount !== powerReferrals.data?.crowdloanReferStatistics.nodes.length) {
        notification.warning({
          message: 'Query Subql As referral',
          description: 'nodes length doesnt equal to total count',
        })
      }
      if (powerContributors.data?.crowdloanWhoStatistics.totalCount !== powerContributors.data?.crowdloanWhoStatistics.nodes.length) {
        notification.warning({
          message: 'Query Subql As Contributor',
          description: 'nodes length doesnt equal to total count',
        })
      }

      const worker = new Worker(new URL('./worker.ts', import.meta.url));
      worker.onerror = (err) => {
        worker.terminate();
        console.error('worker error:', err.message);
      }
      worker.onmessage = (ev) => {
        worker.terminate();
        const {
          totalPower, totalBalance,
          csvRows, rewardsTableDataSource,
          totalStageCRab, totalStageCKton
        } = ev.data;

        setTotalPower(totalPower);
        setTotalBalance(totalBalance);
        setCsvRows(csvRows);
        setTotalStageCRab(totalStageCRab);
        setTotalStageCKton(totalStageCKton);
        setRewardsTableDataSource(rewardsTableDataSource);
        setLoading(false);
      }
      worker.postMessage([
        powerContributors.data?.crowdloanWhoStatistics.nodes || [],
        powerReferrals.data?.crowdloanReferStatistics.nodes || []
      ]);
    } catch (err) {
      console.error(err);
      notification.error({
        message: 'Oops, something went wrong',
        description: (err as Error).message,
      });
      setLoading(false);
    }
  }

  const handleClickDownload = () => {
    downloadCsv(csvRows.map(e => e.join(",")).join("\n"));
  }

  return (
    <PageLayout>
      <PageContent>
        <div className='flex items-end justify-end space-x-24 mb-2'>
          <div className='flex items-center space-x-6'>
            <Statistic loading={loading} title="Total Power" value={totalPower} />
            <Statistic loading={loading} title="Total Contribute" value={totalBalance} />
            <Statistic loading={loading} title="Total Stage CRAB" value={totalStageCRab} />
            <Statistic loading={loading} title="Total Stage CKTON" value={totalStageCKton} />
          </div>

          <div className='flex justify-end items-end space-x-2'>
            <Button className='rounded-md' onClick={handleClickCheckAll} loading={loading} type='primary'>
              Check All
            </Button>
            <Button className='rounded-md' onClick={handleClickDownload} disabled={csvRows.length === 0} loading={loading}>Download CSV</Button>
          </div>
        </div>

        <Breadcrumb className='pl-px pb-1'>
          <Breadcrumb.Item className='antd-breadcrumb-item' onClick={() => navigate('/')}>Home</Breadcrumb.Item>
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

export default React.memo(Page);
