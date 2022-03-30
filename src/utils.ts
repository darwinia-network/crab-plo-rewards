import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, u8aToHex } from '@polkadot/util';
import { Keyring } from '@polkadot/keyring';
import Big from 'big.js';
import { ethers } from 'ethers';
import {
  CRAB_REWARD,
  CKTON_REWARD,
  DOT_PRECISIONS,
  KSM_PRECISIONS,
  MIN_KSM_REWARDS,
  STAGE_REWARDS_RATE,
} from './config';
import type {
  TypeGetUserNftClaimedNode,
  TypeContributorsNode,
  TypeReferralsNode,
  TypeRewardsTableDataSource,
  TypeNftTableDataSource,
} from './type';
import { NftClaimNetworks } from './type';

export const shortAddress = (address = '') => {
  if (address.length && address.length > 12) {
    return `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;
  }
  return address;
};

export const polkadotAddressToPublicKey = (address: string) => u8aToHex(decodeAddress(address));
export const publicKeyToPolkadotAddress = (publicKey: string) => {
  try {
    const address = encodeAddress(hexToU8a(publicKey));
    const keyring = new Keyring();
    keyring.setSS58Format(2); // Kusama format address
    return keyring.addFromAddress(address).address;
  } catch (error) {
    console.error(error);
    return publicKey;
  }
};

export const downloadCsv = (data: string, filename = 'transferx.csv', type = 'data:text/csv;charset=utf-8') => {
  const file = new Blob(['\ufeff' + data], { type: type });
  const url = URL.createObjectURL(file);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
};

export const transformRewardsData = (
  nodesContributor: TypeContributorsNode[],
  nodesReferral: TypeReferralsNode[],
  dataSent: string[][] = []
) => {
  let totalPower = Big(0);
  let totalBalance = Big(0);
  let totalStageCRab = Big(0);
  let totalStageCKton = Big(0);
  let totalCrabNextSend = Big(0);
  let totalKtonNextSend = Big(0);
  const csvRows: string[][] = [];
  const rewardsTableDataSource: TypeRewardsTableDataSource[] = [];

  nodesReferral.forEach((node) => {
    totalPower = totalPower.add(node.totalPower);
  });
  nodesContributor.forEach((node) => {
    totalPower = totalPower.add(node.totalPower);
    totalBalance = totalBalance.add(node.totalBalance);
  });

  nodesContributor.forEach((nodeContributor) => {
    const nodeReferral = nodesReferral.find((v) => v.user === polkadotAddressToPublicKey(nodeContributor.user));
    const share = Big(nodeContributor.totalPower)
      .add(nodeReferral ? nodeReferral.totalPower : 0)
      .div(totalPower);

    const stageCRabReward = share.times(CRAB_REWARD).times(STAGE_REWARDS_RATE);
    const stageCKtonReward = share.times(CKTON_REWARD).times(STAGE_REWARDS_RATE);

    totalStageCRab = totalStageCRab.add(stageCRabReward);
    totalStageCKton = totalStageCKton.add(stageCKtonReward);

    const sentCrab = dataSent.find((v) => v[0] === nodeContributor.user && v[1] === 'ring');
    const sentKton = dataSent.find((v) => v[0] === nodeContributor.user && v[1] === 'kton');

    const differCrab = stageCRabReward.minus(sentCrab ? sentCrab[2] : 0);
    const differKton = stageCKtonReward.minus(sentKton ? sentKton[2] : 0);
    if (differCrab.gte(MIN_KSM_REWARDS)) {
      totalCrabNextSend = totalCrabNextSend.add(differCrab);
      csvRows.push([nodeContributor.user, 'ring', differCrab.toFixed(8), 'kusama']);
    }
    if (differKton.gte(MIN_KSM_REWARDS)) {
      totalKtonNextSend = totalKtonNextSend.add(differKton);
      csvRows.push([nodeContributor.user, 'kton', differKton.toFixed(8), 'kusama']);
    }

    rewardsTableDataSource.push({
      key: rewardsTableDataSource.length,
      index: rewardsTableDataSource.length + 1,
      address: nodeContributor.user,
      ksmAsContributor: Big(nodeContributor.totalBalance).div(KSM_PRECISIONS).toFixed(8),
      ksmAsReferral: Big(nodeReferral ? nodeReferral.totalBalance : 0)
        .div(KSM_PRECISIONS)
        .toFixed(8),
      stageCRabRewards: stageCRabReward.toFixed(8),
      stageCKtonRewards: stageCKtonReward.toFixed(8),
      sentCRab: sentCrab ? sentCrab[2] : '0.00000000',
      sentKton: sentKton ? sentKton[2] : '0.00000000',
      differCrab: differCrab.toFixed(8),
      differKton: differKton.toFixed(8),
    });
  });

  nodesReferral.forEach((nodeReferral) => {
    const address = publicKeyToPolkadotAddress(nodeReferral.user);
    if (!rewardsTableDataSource.find((v) => v.address === address)) {
      const share = Big(nodeReferral.totalPower).div(totalPower);
      const stageCRabReward = share.times(CRAB_REWARD).times(STAGE_REWARDS_RATE);
      const stageCKtonReward = share.times(CKTON_REWARD).times(STAGE_REWARDS_RATE);

      totalStageCRab = totalStageCRab.add(stageCRabReward);
      totalStageCKton = totalStageCKton.add(stageCKtonReward);

      const sentCrab = dataSent.find((v) => v[0] === address && v[1] === 'ring');
      const sentKton = dataSent.find((v) => v[0] === address && v[1] === 'kton');

      const differCrab = stageCRabReward.minus(sentCrab ? sentCrab[2] : 0);
      const differKton = stageCKtonReward.minus(sentKton ? sentKton[2] : 0);
      if (differCrab.gte(MIN_KSM_REWARDS)) {
        totalCrabNextSend = totalCrabNextSend.add(differCrab);
        csvRows.push([address, 'ring', differCrab.toFixed(8), 'kusama']);
      }
      if (differKton.gte(MIN_KSM_REWARDS)) {
        totalKtonNextSend = totalKtonNextSend.add(differKton);
        csvRows.push([address, 'kton', differKton.toFixed(8), 'kusama']);
      }

      rewardsTableDataSource.push({
        key: rewardsTableDataSource.length,
        index: rewardsTableDataSource.length + 1,
        address: address,
        ksmAsContributor: Big(0).toFixed(8),
        ksmAsReferral: Big(nodeReferral.totalBalance).div(KSM_PRECISIONS).toFixed(8),
        stageCRabRewards: stageCRabReward.toFixed(8),
        stageCKtonRewards: stageCKtonReward.toFixed(8),
        sentCRab: sentCrab ? sentCrab[2] : '0.00000000',
        sentKton: sentKton ? sentKton[2] : '0.00000000',
        differCrab: differCrab.toFixed(8),
        differKton: differKton.toFixed(8),
      });
    }
  });

  return {
    totalPower: totalPower.toString(),
    totalBalance: totalBalance.div(KSM_PRECISIONS).toFixed(8),
    totalStageCRab: totalStageCRab.toFixed(8),
    totalStageCKton: totalStageCKton.toFixed(8),
    totalCrabNextSend: totalCrabNextSend.toFixed(8),
    totalKtonNextSend: totalKtonNextSend.toFixed(8),
    csvRows,
    rewardsTableDataSource,
  };
};

export const transformNftsData = (data: string[][], nodes: TypeGetUserNftClaimedNode[], network: NftClaimNetworks) => {
  const csvRowsTotal: string[][] = [['Contribute的地址', 'Contribute数量']];
  const csvRowsClaimed: string[][] = [['Contribute的地址', '接收NFT的地址', 'Contribute数量']];
  const csvRowsUnclaim: string[][] = [['Contribute的地址', 'Contribute数量']];
  let nftTableDataSource: TypeNftTableDataSource[] = [];

  const precision = network === NftClaimNetworks.CRAB ? KSM_PRECISIONS : DOT_PRECISIONS;

  for (let value of data) {
    const claim = nodes?.find((v) => v.signer === value[0]);
    const contribute = Big(value[1]).div(precision).toFixed(8);
    nftTableDataSource.push({
      key: 0,
      index: 0,
      address: value[0],
      totalContribute: contribute,
      claimAddress: claim ? { address: claim.addressValue, extrinsicHash: claim.extrinsicHash, network } : null,
      isClaimed: claim ? true : false,
    });
    csvRowsTotal.push([value[0], contribute]);
    claim && ethers.utils.isAddress(claim.addressValue)
      ? csvRowsClaimed.push([value[0], claim.addressValue, contribute])
      : csvRowsUnclaim.push([value[0], contribute]);
  }

  nftTableDataSource = nftTableDataSource.map((value, index) => ({
    ...value,
    key: index,
    index: nftTableDataSource.length - index,
  }));

  return {
    nftTableDataSource,
    csvRowsTotal,
    csvRowsClaimed,
    csvRowsUnclaim,
  };
};
