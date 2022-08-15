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

type ClaimState = [string, string][];
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

  const [totalClaimedAirdrop, setTotalClaimedAirdrop] = useState(Big(0));
  const [totalUnclaimAirdrop, setTotalUnclaimAirdrop] = useState(Big(0));
  const [genesisTotalAirdrop, setGenesisTotalAirdrop] = useState(Big(0));

  useEffect(() => {
    const total = Object.values(genesisData.dot)
      .reduce((acc, cur) => acc.add(cur), Big(0))
      .add(Object.values(genesisData.eth).reduce((acc, cur) => acc.add(cur), Big(0)))
      .add(Object.values(genesisData.tron).reduce((acc, cur) => acc.add(cur), Big(0)));

    setGenesisTotalAirdrop(total);
  }, []);

  useEffect(() => {
    if (!(api.query.claims?.claimsFromEth && api.query.claims?.claimsFromTron)) {
      return;
    }

    setLoading(true);

    const sub$$ = combineLatest(
      [api.query.claims.claimsFromEth.entries(...[]), api.query.claims.claimsFromTron.entries(...[])],
      (eth, tron) => [
        eth.map((item) => [item[0].toHuman()?.toString(), item[1].toString()]),
        tron.map((item) => [item[0].toHuman()?.toString(), item[1].toString()]),
      ]
    ).subscribe(([eth, tron]) => {
      setEthClaimed(eth as ClaimState);
      setTronClaimed(tron as ClaimState);

      setLoading(false);
    });

    return () => sub$$.unsubscribe();
  }, [api]);

  const { dataSource, unclaimDot, unclaimEth, unclaimTron } = useMemo(() => {
    let unclaimEth: string[] = [];
    let unclaimDot: string[] = [];
    let unclaimTron: string[] = [];
    const dataSource: UnclaimTableState[] = [];

    if (ethClaimed.length && tronClaimed.length) {
      setLoading(true);

      type dotKey = keyof typeof genesisData.dot;
      type ethKey = keyof typeof genesisData.eth;
      type tronKey = keyof typeof genesisData.tron;

      unclaimDot = Object.keys(genesisData.dot).filter(
        (address: string) =>
          !ethClaimed.some(
            ([addr, amount]) =>
              addr.toLowerCase() === address.toLowerCase() && amount === genesisData.dot[address as dotKey].toString()
          )
      );
      unclaimEth = Object.keys(genesisData.eth).filter(
        (address: string) =>
          !ethClaimed.some(
            ([addr, amount]) =>
              addr.toLowerCase() === address.toLowerCase() && amount === genesisData.eth[address as ethKey].toString()
          )
      );
      unclaimTron = Object.keys(genesisData.tron).filter(
        (address: string) =>
          !tronClaimed.some(
            ([addr, amount]) =>
              addr.toLowerCase() === `0x${address.slice(2)}`.toLowerCase() &&
              amount === genesisData.tron[address as tronKey].toString()
          )
      );

      unclaimDot.forEach((item) => {
        dataSource.push({
          key: `dot-${item}`,
          snapshotAddress: item,
          substrateAddress: convertToSS58(dvmAddressToAccountId(item).toString(), SUBSTRATE_PREFIX),
          crabAmount: genesisData.dot[item as dotKey],
        });
      });

      unclaimEth.forEach((item) => {
        dataSource.push({
          key: `eth-${item}`,
          snapshotAddress: item,
          substrateAddress: convertToSS58(dvmAddressToAccountId(item).toString(), SUBSTRATE_PREFIX),
          crabAmount: genesisData.eth[item as ethKey],
        });
      });

      unclaimTron.forEach((item) => {
        dataSource.push({
          key: `tron-${item}`,
          snapshotAddress: item,
          substrateAddress: convertToSS58(dvmAddressToAccountId(`0x${item.slice(2)}`).toString(), SUBSTRATE_PREFIX),
          crabAmount: genesisData.tron[item as tronKey],
        });
      });

      // check testing
      // {
      //   ethClaimed.forEach((item) => {
      //     const foundDot = Object.keys(genesisData.dot).find(address => address.toLowerCase() === item[0].toLowerCase());
      //     const foundEth = Object.keys(genesisData.eth).find(address => address.toLowerCase() === item[0].toLowerCase());

      //     if (foundDot && genesisData.dot[foundDot as dotKey].toString() !== item[1].toString()) {
      //       console.log('dot', item[0], item[1], genesisData.dot[foundDot as dotKey]);
      //     } else if (foundEth && genesisData.eth[foundEth as ethKey].toString() !== item[1].toString()) {
      //       console.log('eth', item[0], item[1], genesisData.eth[foundEth as ethKey]);
      //     } else if (!(foundDot || foundEth)) {
      //       console.log('dot && eth unfound', item[0]);
      //     }
      //   });

      //   tronClaimed.forEach((item) => {
      //     const found = Object.keys(genesisData.tron).find(address => `0x${address.slice(2)}`.toLowerCase() === item[0].toLowerCase());
      //     if (found && genesisData.tron[found as tronKey].toString() !== item[1].toString()) {
      //       console.log('tron', item[0], item[1], genesisData.tron[found as tronKey]);
      //     } else if (!found) {
      //       console.log('tron unfound', item[0]);
      //     }
      //   });

      //   ethClaimed.forEach((item) => {
      //     if (item[0].toLowerCase() === '0xff7f274399c5040331a59e941b4971f31e15e47d'.toLowerCase()) {
      //       console.log('amount:', item[1]);
      //     }
      //   });

      //   dataSource.forEach(item => {
      //     if ('0xff7f274399c5040331a59e941b4971f31e15e47d' === item.snapshotAddress) {
      //       console.log('yes', item.crabAmount);
      //     }
      //   });
      // }

      setTotalClaimedAirdrop(
        ethClaimed
          .reduce((acc, cur) => acc.add(cur[1]), Big(0))
          .add(tronClaimed.reduce((acc, cur) => acc.add(cur[1]), Big(0)))
      );

      setTotalUnclaimAirdrop(dataSource.reduce((acc, cur) => acc.add(cur.crabAmount), Big(0)));
    }

    setLoading(false);

    return { dataSource, unclaimEth, unclaimDot, unclaimTron };
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
        <div className="flex items-end justify-end space-x-2 mb-2">
          <div className="flex items-end space-x-6">
            <Statistic
              loading={loading}
              title="Total Genesis Addresses"
              value={
                Object.keys(genesisData.dot).length +
                Object.keys(genesisData.eth).length +
                Object.keys(genesisData.tron).length
              }
            />
            <Statistic
              loading={loading}
              title="Total Claimed Addresses"
              value={ethClaimed.length + tronClaimed.length}
            />
            <Statistic loading={loading} title="Total Unclaim Addresses" value={dataSource.length} />
            <Statistic
              loading={loading}
              title="Total Unclaim ETH Addresses"
              value={unclaimDot.length + unclaimEth.length}
            />
            <Statistic loading={loading} title="Total Unclaim TRON Addresses" value={unclaimTron.length} />
            <Statistic
              loading={loading}
              title="Total Claimed Airdrop (CRAB)"
              value={totalClaimedAirdrop.div(CRAB_PRECISIONS).toFixed(4)}
            />
            <Statistic
              loading={loading}
              title="Total Unclaim Airdrop (CRAB)"
              value={totalUnclaimAirdrop.div(CRAB_PRECISIONS).toFixed(4)}
            />
            <Statistic
              loading={loading}
              title="Total Genesis Airdrop (CRAB)"
              value={genesisTotalAirdrop.div(CRAB_PRECISIONS).toFixed(4)}
            />
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
