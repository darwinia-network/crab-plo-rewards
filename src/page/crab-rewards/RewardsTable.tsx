import React from 'react';
import { Table, Typography, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { toShortAddress } from '../../utils';
import type { TypeRewardsTableDataSource } from '../../type';

type TypePros = {
  loading: boolean;
  dataSource: TypeRewardsTableDataSource[];
};

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
    render: (text: string) => <Typography.Text copyable={{ text: text }}>{toShortAddress(text)}</Typography.Text>,
  },
  {
    title: (
      <div className="inline-flex items-center">
        As Contributor
        <Tooltip title="作为Contributor贡献的KSM">
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      </div>
    ),
    dataIndex: 'ksmAsContributor',
    key: 'ksmAsContributor',
    align: 'right',
  },
  {
    title: (
      <div className="inline-flex items-center">
        As Referral
        <Tooltip title="作为推荐者贡献的KSM">
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      </div>
    ),
    dataIndex: 'ksmAsReferral',
    key: 'ksmAsReferral',
    align: 'right',
  },
  {
    title: (
      <div className="inline-flex items-center">
        CRAB Rewards
        <Tooltip title="应该获得的CRAB奖励">
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      </div>
    ),
    dataIndex: 'crabRewards',
    key: 'crabRewards',
    align: 'right',
  },
  {
    title: (
      <div className="inline-flex items-center">
        Stage CRAB
        <Tooltip title="乘完7.5%之后应发的CRAB">
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      </div>
    ),
    dataIndex: 'stageCRabRewards',
    key: 'stageCRabRewards',
    align: 'right',
  },
  {
    title: (
      <div className="inline-flex items-center">
        CKTON Rewards
        <Tooltip title="应该获得的CKTON奖励">
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      </div>
    ),
    dataIndex: 'cktonRewards',
    key: 'cktonRewards',
    align: 'right',
  },
  {
    title: (
      <div className="inline-flex items-center">
        Stage CKTON
        <Tooltip title="乘完7.5%之后应发的CKTON">
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      </div>
    ),
    dataIndex: 'stageCKtonRewards',
    key: 'stageCKtonRewards',
    align: 'right',
  },
];

const Component: React.FC<TypePros> = (props) => {
  const { dataSource, loading } = props;
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={{
        defaultPageSize: 50,
        showQuickJumper: true,
        showLessItems: true,
        total: dataSource.length,
        showTotal: (total) => `Total Items: ${total}`,
      }}
      scroll={{ y: 'calc(100vh - 20rem)', x: 'max-content' }}
    />
  );
};

export const RewardsTable = React.memo<TypePros>(Component);
