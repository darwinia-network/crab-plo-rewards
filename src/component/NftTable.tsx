import React from 'react';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { toShortAddress } from '../utils';
import { NftClaimNetworks } from '../type';
import type { TypeNftTableDataSource } from '../type';
import { ethers } from 'ethers';

type TypePros = {
  loading: boolean;
  dataSource: TypeNftTableDataSource[];
};

const columns: ColumnsType<TypeNftTableDataSource> = [
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
    title: 'Claim Address',
    dataIndex: 'claimAddress',
    key: 'claimAddress',
    align: 'center',
    render: (text: { address: string; extrinsicHash: string; network: NftClaimNetworks } | null) =>
      text ? (
        <div className="inline-flex space-x-1">
          <Typography.Text
            copyable={{ text: text.address }}
            type={ethers.utils.isAddress(text.address) ? 'success' : 'danger'}
          >
            {toShortAddress(text.address)}
          </Typography.Text>
          <span>·</span>
          <Typography.Link
            target={'_blank'}
            href={`${
              text.network === NftClaimNetworks.CRAB
                ? 'https://kusama.subscan.io/extrinsic/'
                : 'https://polkadot.subscan.io/extrinsic/'
            }${text.extrinsicHash}`}
          >
            extrinsic
          </Typography.Link>
        </div>
      ) : (
        <Typography.Text>None</Typography.Text>
      ),
  },
  {
    title: 'Is Claimed',
    dataIndex: 'isClaimed',
    key: 'isClaimed',
    align: 'center',
    render: (bool: boolean) => (
      <Typography.Text type={bool ? 'success' : 'secondary'}>{bool ? 'Yes' : 'No'}</Typography.Text>
    ),
    filters: [
      {
        text: 'Yes',
        value: true,
      },
      {
        text: 'No',
        value: false,
      },
    ],
    onFilter: (value, record) => record.isClaimed === value,
  },
  {
    title: 'Total Conntribute',
    dataIndex: 'totalContribute',
    key: 'totalContribute',
    align: 'center',
  },
];

const Component: React.FC<TypePros> = (props) => (
  <Table
    columns={columns}
    dataSource={props.dataSource}
    loading={props.loading}
    pagination={{
      defaultPageSize: 50,
      showQuickJumper: true,
      showLessItems: true,
      total: props.dataSource.length,
      showTotal: (total) => `Total Items: ${total}`,
    }}
    scroll={{ y: 'calc(100vh - 20rem)', x: 'max-content' }}
  />
);

export const NftTable = React.memo<TypePros>(Component);
