import React from 'react';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { shortAddress } from '../../utils';
import type { TypeNftTableDataSource } from '../../type';
import { ethers } from 'ethers';

type TypePros = {
  loading: boolean;
  dataSource: TypeNftTableDataSource[];
}

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
    render: (text: string) => (
      <Typography.Text copyable={{ text: text }}>{shortAddress(text)}</Typography.Text>
    ),
  },
  {
    title: 'Claim Address',
    dataIndex: 'claimAddress',
    key: 'claimAddress',
    align: 'center',
    render: (text: { address: string, extrinsicHash: string } | null) => (
      text ? (
        <div className='inline-flex space-x-1'>
          <Typography.Text copyable={{ text: text.address }} type={ethers.utils.isAddress(text.address) ? 'success' : 'danger'}>
            {shortAddress(text.address)}
          </Typography.Text>
          <span>·</span>
          <Typography.Link target={'_blank'} href={`https://kusama.subscan.io/extrinsic/${text.extrinsicHash}`}>extrinsic</Typography.Link>
        </div>
      ) : (<Typography.Text >None</Typography.Text>)
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
    filters: [{
      text: 'Yes',
      value: true,
    }, {
      text: 'No',
      value: false,
    }],
    onFilter: (value, record) => record.isClaimed === value,
  },
  {
    title: 'KSM Conntribute',
    dataIndex: 'ksmContribute',
    key: 'ksmContribute',
    align: 'center',
  },
];

const Component: React.FC<TypePros> = (props) => (
  <Table columns={columns} dataSource={props.dataSource} loading={props.loading} pagination={false} scroll={{ y: 'calc(100vh - 20rem)', x: 'max-content' }} />
);

export const NftTable = React.memo<TypePros>(Component);
