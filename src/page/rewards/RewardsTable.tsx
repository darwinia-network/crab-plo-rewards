import React from 'react';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { shortAddress } from '../../utils';
import type { TypeRewardsTableDataSource } from '../../type';

type TypePros = {
  loading: boolean;
  dataSource: TypeRewardsTableDataSource[];
}

const columns: ColumnsType<TypeRewardsTableDataSource> = [
  {
    title: 'Index',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
    render: (text: string) => (
      <Typography.Text copyable={{ text: text }}>{shortAddress(text)}</Typography.Text>
    )
  },
  {
    title: 'Current CRAB Rewards',
    dataIndex: 'currentCRabRewards',
    key: 'currentCRabRewards',
    align: 'right',
  },
  {
    title: 'Stage CRAB Rewards',
    dataIndex: 'stageCRabRewards',
    key: 'stageCRabRewards',
    align: 'right',
  },
  {
    title: 'Current CKTON Rewards',
    dataIndex: 'currentCKtonRewards',
    key: 'currentCKtonRewards',
    align: 'right',
  },
  {
    title: 'Stage CKTON Rewards',
    dataIndex: 'stageCKtonRewards',
    key: 'stageCKtonRewards',
    align: 'right',
  },
];

const Component: React.FC<TypePros> = (props) => {
  const { dataSource, loading } = props;
  return (
    <Table columns={columns} dataSource={dataSource} loading={loading} pagination={false} scroll={{ y: 'calc(100vh - 20rem)', x: 'max-content' }} />
  );
};

export const RewardsTable = React.memo<TypePros>(Component);
