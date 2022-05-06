import React, { useEffect, useState, useMemo } from 'react';
import { combineLatest } from 'rxjs';
import genesisData from './genesis.json';
import { useApi } from '../../hook';
import { Table, Typography, Breadcrumb, Button, Statistic } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { toShortAddress, dvmAddressToAccountId, convertToSS58, downloadCsv } from '../../utils';
import { SUBSTRATE_PREFIX, CRAB_PRECISIONS } from '../../config';
import Big from 'big.js';
import { PageLayout, PageContent, PageFooter } from '../../component';
import { useNavigate } from 'react-router-dom';

type ClaimState = string[];
type UnclaimTableState = {
  key: string;
  snapshotAddress: string;
  substrateAddress: string;
  crabAmount: number;
};

const columns: ColumnsType<UnclaimTableState> = [
  {
    key: 'snapshotAddress',
    title: 'Snapshot Address',
    dataIndex: 'snapshotAddress',
    filters: [
      {
        text: 'ETH',
        value: '0x',
      },
      {
        text: 'TRON',
        value: '41',
      },
    ],
    onFilter: (value, record) => record.snapshotAddress.startsWith(value as string),
    align: 'center',
    render: (address) => <Typography.Text copyable={{ text: address }}>{toShortAddress(address)}</Typography.Text>,
  },
  {
    key: 'substrateAddress',
    title: 'Substrate Address',
    dataIndex: 'substrateAddress',
    align: 'center',
    render: (address) => <Typography.Text copyable={{ text: address }}>{toShortAddress(address)}</Typography.Text>,
  },
  {
    key: 'crabAmount',
    title: 'Crab Amount',
    dataIndex: 'crabAmount',
    align: 'center',
    render: (amount) => Big(amount).div(CRAB_PRECISIONS).toFixed(4),
  },
];

const Page = () => {
  const { api } = useApi();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ethClaimed, setEthClaimed] = useState<ClaimState>([]);
  const [tronClaimed, setTronClaimed] = useState<ClaimState>([]);

  useEffect(() => {
    setLoading(true);

    combineLatest(
      [api.query.claims.claimsFromEth.entries(...[]), api.query.claims.claimsFromTron.entries(...[])],
      (eth, tron) => [
        eth.map((item) => item[0].toHuman()?.toString()),
        tron.map((item) => item[0].toHuman()?.toString()),
      ]
    ).subscribe(([eth, tron]) => {
      setEthClaimed(eth as ClaimState);
      setTronClaimed(tron as ClaimState);

      setLoading(false);
    });
  }, [api]);

  const { dataSource, unclaimEth, unclaimTron } = useMemo(() => {
    let unclaimEth: string[] = [];
    let unclaimTron: string[] = [];
    const dataSource: UnclaimTableState[] = [];

    if (ethClaimed.length && tronClaimed.length) {
      setLoading(true);

      unclaimEth = Object.keys(genesisData.dot)
        .concat(Object.keys(genesisData.eth))
        .filter((address: string) => !ethClaimed.some((claimed) => claimed === address));
      unclaimTron = Object.keys(genesisData.tron).filter(
        (address: string) => !tronClaimed.some((claimed) => claimed === `0x${address.slice(2)}`)
      );

      type dotKey = keyof typeof genesisData.dot;
      type ethKey = keyof typeof genesisData.eth;
      type tronKey = keyof typeof genesisData.tron;

      unclaimEth.forEach((item) => {
        dataSource.push({
          key: item,
          snapshotAddress: item,
          substrateAddress: convertToSS58(dvmAddressToAccountId(item).toString(), SUBSTRATE_PREFIX),
          crabAmount: genesisData.dot[item as dotKey]
            ? genesisData.dot[item as dotKey]
            : genesisData.eth[item as ethKey],
        });
      });

      unclaimTron.forEach((item) => {
        dataSource.push({
          key: item,
          snapshotAddress: item,
          substrateAddress: convertToSS58(dvmAddressToAccountId(`0x${item.slice(2)}`).toString(), SUBSTRATE_PREFIX),
          crabAmount: genesisData.tron[item as tronKey],
        });
      });
    }

    setLoading(false);

    return { dataSource, unclaimEth, unclaimTron };
  }, [ethClaimed, tronClaimed]);

  const handleExport = () => {
    downloadCsv(
      ['快照地址, 转换为Substrate地址, 未领Crab数量']
        .concat(
          dataSource.map((item) => `${item.snapshotAddress}, ${item.substrateAddress}, ${item.crabAmount.toString()}`)
        )
        .join('\n'),
      'airdrop-unclaim.csv'
    );
  };

  return (
    <PageLayout>
      <PageContent>
        <div className="flex items-end justify-end space-x-24 mb-2">
          <div className="flex items-center space-x-6">
            <Statistic loading={loading} title="Total ETH Addresses" value={unclaimEth.length} />
            <Statistic loading={loading} title="Total TRON Addresses" value={unclaimTron.length} />
            <Statistic loading={loading} title="Total Addresses" value={dataSource.length} />
          </div>
          <div className="flex justify-end items-end space-x-2">
            <Button
              className="rounded-md"
              onClick={handleExport}
              loading={loading}
              disabled={!dataSource.length}
              type="primary"
            >
              Export
            </Button>
          </div>
        </div>
        <Breadcrumb className="pl-px pb-1">
          <Breadcrumb.Item className="antd-breadcrumb-item" onClick={() => navigate('/')}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Airdrop</Breadcrumb.Item>
        </Breadcrumb>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          scroll={{ y: 'calc(100vh - 20rem)', x: 'max-content' }}
        />
      </PageContent>
      <PageFooter />
    </PageLayout>
  );
};

export default React.memo(Page);
