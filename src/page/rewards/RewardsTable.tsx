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
    title: 'As Contributor',
    dataIndex: 'ksmAsContributor',
    key: 'ksmAsContributor',
    align: 'right',
  },
  {
    title: 'As Referral',
    dataIndex: 'ksmAsReferral',
    key: 'ksmAsReferral',
    align: 'right',
  },
  {
    title: 'Stage CRAB',
    dataIndex: 'stageCRabRewards',
    key: 'stageCRabRewards',
    align: 'right',
  },
  {
    title: 'Stage CKTON',
    dataIndex: 'stageCKtonRewards',
    key: 'stageCKtonRewards',
    align: 'right',
  },
  {
    title: 'Sent(CRAB)',
    dataIndex: 'sentCRab',
    key: 'sentCRab',
    align: 'right',
  },
  {
    title: 'Sent(CKTON)',
    dataIndex: 'sentKton',
    key: 'sentKton',
    align: 'right',
  },
  {
    title: 'Differ(Crab)',
    dataIndex: 'differCrab',
    key: 'differCrab',
    align: 'right',
    render: (text: string) => (
      <Typography.Text type={(text === '0.00000000' || text === '-0.00000000') ? 'secondary' : text.startsWith('-') ? 'danger' : 'success'}>{text}</Typography.Text>
    ),
  },
  {
    title: 'Differ(CKTON)',
    dataIndex: 'differKton',
    key: 'differKton',
    align: 'right',
    render: (text: string) => (
      <Typography.Text type={(text === '0.00000000' || text === '-0.00000000') ? 'secondary' : text.startsWith('-') ? 'danger' : 'success'}>{text}</Typography.Text>
    ),
  },
];

const Component: React.FC<TypePros> = (props) => {
  const { dataSource, loading } = props;
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={{ defaultPageSize: 50, showQuickJumper: true, showLessItems: true, total: dataSource.length, showTotal: total => `Total Items: ${total}` }}
      scroll={{ y: 'calc(100vh - 20rem)', x: 'max-content' }}
    />
  );
};

export const RewardsTable = React.memo<TypePros>(Component);
