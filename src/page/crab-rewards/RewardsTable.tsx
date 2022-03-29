import React from 'react';
import { Table, Typography, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { shortAddress } from '../../utils';
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
    render: (text: string) => <Typography.Text copyable={{ text: text }}>{shortAddress(text)}</Typography.Text>,
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
        Stage CRAB
        <Tooltip title="乘完10%之后应发的CRAB">
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
        Stage CKTON
        <Tooltip title="乘完10%之后应发的CKTON">
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      </div>
    ),
    dataIndex: 'stageCKtonRewards',
    key: 'stageCKtonRewards',
    align: 'right',
  },
  {
    title: (
      <div className="inline-flex items-center">
        Sent(CRAB)
        <Tooltip title="已经发出去的CRAB">
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      </div>
    ),
    dataIndex: 'sentCRab',
    key: 'sentCRab',
    align: 'right',
  },
  {
    title: (
      <div className="inline-flex items-center">
        Sent(CKTON)
        <Tooltip title="已经发出去的CKTON">
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      </div>
    ),
    dataIndex: 'sentKton',
    key: 'sentKton',
    align: 'right',
  },
  {
    title: (
      <div className="inline-flex items-center">
        Differ(CRAB)
        <Tooltip title="等于「Stage CRAB」减去「Sent(CRAB)」。红色表示发多了，绿色表示未发的数量">
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      </div>
    ),
    dataIndex: 'differCrab',
    key: 'differCrab',
    align: 'right',
    render: (text: string) => (
      <Typography.Text
        type={
          text === '0.00000000' || text === '-0.00000000' ? 'secondary' : text.startsWith('-') ? 'danger' : 'success'
        }
      >
        {text}
      </Typography.Text>
    ),
  },
  {
    title: (
      <div className="inline-flex items-center">
        Differ(CKTON)
        <Tooltip title="等于「Stage CKTON」减去「Sent(CKTON)」。红色表示发多了，绿色表示未发的数量">
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      </div>
    ),
    dataIndex: 'differKton',
    key: 'differKton',
    align: 'right',
    render: (text: string) => (
      <Typography.Text
        type={
          text === '0.00000000' || text === '-0.00000000' ? 'secondary' : text.startsWith('-') ? 'danger' : 'success'
        }
      >
        {text}
      </Typography.Text>
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
