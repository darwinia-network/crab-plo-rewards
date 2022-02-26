import React, { useState } from 'react';
import { Button, Statistic, Breadcrumb, notification } from 'antd';
import { useApolloClient } from "@apollo/client";
import { RewardsTable } from './RewardsTable';
import { PageLayout, PageContent, PageFooter } from '../../component';
import { downloadCsv, transformRewardsData } from '../../utils';
import { GET_CONTRIBUTORS_POWER, GET_REFERRALS_POWER, KSM_PRECISIONS } from '../../config';
import { TypeRewardsTableDataSource } from '../../type';
import { useNavigate } from 'react-router-dom';
import Big from 'big.js';

const Page: React.FC = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [csvRows, setCsvRows] = useState<string[][]>([]);
  const [totalPower, setTotalPower] = useState<Big>(Big(0));
  const [totalBalance, setTotalBalance] = useState<Big>(Big(0));
  const [totalStageCRab, setTotalStageCRab] = useState<Big>(Big(0));
  const [totalStageCKton, setTotalStageCKton] = useState<Big>(Big(0));
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

      const {
        totalPower, totalBalance,
        csvRows, rewardsTableDataSource,
        totalStageCRab, totalStageCKton
      } = transformRewardsData((powerContributors.data?.crowdloanWhoStatistics.nodes || []), (powerReferrals.data?.crowdloanReferStatistics.nodes || []));

      setTotalPower(totalPower);
      setTotalBalance(totalBalance);
      setCsvRows(csvRows);
      setTotalStageCRab(totalStageCRab);
      setTotalStageCKton(totalStageCKton);
      setRewardsTableDataSource(rewardsTableDataSource);
    } catch (err) {
      console.error(err);
      notification.error({
        message: 'Oops, something went wrong',
        description: (err as Error).message,
      });
    } finally {
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
            <Statistic loading={loading} title="Total Power" value={totalPower.toString()} />
            <Statistic loading={loading} title="Total Contribute" value={totalBalance.div(KSM_PRECISIONS).toFixed(8)} />
            <Statistic loading={loading} title="Total Stage CRAB" value={totalStageCRab.toFixed(8)} />
            <Statistic loading={loading} title="Total Stage CKTON" value={totalStageCKton.toFixed(8)} />
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
