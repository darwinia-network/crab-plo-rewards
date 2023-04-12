import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, u8aToHex, stringToU8a, numberToU8a, isNull } from '@polkadot/util';
import { TypeRegistry } from '@polkadot/types';
import type { Codec, DetectCodec } from '@polkadot/types/types';
import { Keyring } from '@polkadot/keyring';
import Big from 'big.js';
import { ethers } from 'ethers';
import {
  CRAB_REWARD,
  CKTON_REWARD,
  DOT_PRECISIONS,
  KSM_PRECISIONS,
  STAGE_REWARDS_RATE,
  SUBSTRATE_PREFIX,
} from './config';
import type {
  TypeGetUserNftClaimRemarkNode,
  TypeContributorsNode,
  TypeReferralsNode,
  TypeRewardsTableDataSource,
  TypeNftTableDataSource,
} from './type';
import { NftClaimNetworks } from './type';

export const toShortAddress = (address = '') => {
  if (address.length && address.length > 12) {
    return `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;
  }
  return address;
};

export const registry = new TypeRegistry();

export function dvmAddressToAccountId(address: string | null | undefined): DetectCodec<Codec, string> {
  if (!address) {
    return registry.createType('AccountId', '');
  }

  // eslint-disable-next-line no-magic-numbers
  const data = new Uint8Array(32);

  data.set(stringToU8a('dvm:'));
  // eslint-disable-next-line no-magic-numbers
  data.set(hexToU8a(address), 11);
  // eslint-disable-next-line no-bitwise
  const checksum = data.reduce((pre: number, current: number): number => pre ^ current);

  // eslint-disable-next-line no-magic-numbers
  data.set(numberToU8a(checksum), 31);
  const accountId = registry.createType('AccountId', data);

  return accountId;
}

export function convertToSS58(text: string, prefix: number | null, isShort = false): string {
  if (!text || isNull(prefix)) {
    return '';
  }

  try {
    let address = encodeAddress(text, prefix);

    if (isShort) {
      address = toShortAddress(address);
    }

    return address;
  } catch (error) {
    return '';
  }
}

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

export const transformRewardsData = (nodesContributor: TypeContributorsNode[], nodesReferral: TypeReferralsNode[]) => {
  let totalPower = Big(0);
  let totalBalance = Big(0);
  let totalStageCRab = Big(0);
  let totalStageCKton = Big(0);
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

    const crabRewards = share.times(CRAB_REWARD);
    const cktonRewards = share.times(CKTON_REWARD);

    const stageCRabReward = crabRewards.times(STAGE_REWARDS_RATE);
    const stageCKtonReward = cktonRewards.times(STAGE_REWARDS_RATE);

    totalStageCRab = totalStageCRab.add(stageCRabReward);
    totalStageCKton = totalStageCKton.add(stageCKtonReward);

    csvRows.push([nodeContributor.user, 'ring', stageCRabReward.toFixed(8), 'kusama']);
    csvRows.push([nodeContributor.user, 'kton', stageCKtonReward.toFixed(8), 'kusama']);

    rewardsTableDataSource.push({
      key: rewardsTableDataSource.length,
      index: rewardsTableDataSource.length + 1,
      address: nodeContributor.user,
      ksmAsContributor: Big(nodeContributor.totalBalance).div(KSM_PRECISIONS).toFixed(8),
      ksmAsReferral: Big(nodeReferral ? nodeReferral.totalBalance : 0)
        .div(KSM_PRECISIONS)
        .toFixed(8),
      crabRewards: crabRewards.toFixed(8),
      cktonRewards: cktonRewards.toFixed(8),
      stageCRabRewards: stageCRabReward.toFixed(8),
      stageCKtonRewards: stageCKtonReward.toFixed(8),
    });
  });

  nodesReferral.forEach((nodeReferral) => {
    const address = publicKeyToPolkadotAddress(nodeReferral.user);
    if (!rewardsTableDataSource.find((v) => v.address === address)) {
      const share = Big(nodeReferral.totalPower).div(totalPower);

      const crabRewards = share.times(CRAB_REWARD);
      const cktonRewards = share.times(CKTON_REWARD);

      const stageCRabReward = crabRewards.times(STAGE_REWARDS_RATE);
      const stageCKtonReward = cktonRewards.times(STAGE_REWARDS_RATE);

      totalStageCRab = totalStageCRab.add(stageCRabReward);
      totalStageCKton = totalStageCKton.add(stageCKtonReward);

      csvRows.push([address, 'ring', stageCRabReward.toFixed(8), 'kusama']);
      csvRows.push([address, 'kton', stageCKtonReward.toFixed(8), 'kusama']);

      rewardsTableDataSource.push({
        key: rewardsTableDataSource.length,
        index: rewardsTableDataSource.length + 1,
        address: address,
        ksmAsContributor: Big(0).toFixed(8),
        ksmAsReferral: Big(nodeReferral.totalBalance).div(KSM_PRECISIONS).toFixed(8),
        crabRewards: crabRewards.toFixed(8),
        cktonRewards: cktonRewards.toFixed(8),
        stageCRabRewards: stageCRabReward.toFixed(8),
        stageCKtonRewards: stageCKtonReward.toFixed(8),
      });
    }
  });

  return {
    totalPower: totalPower.toString(),
    totalBalance: totalBalance.div(KSM_PRECISIONS).toFixed(8),
    totalStageCRab: totalStageCRab.toFixed(0),
    totalStageCKton: totalStageCKton.toFixed(0),
    csvRows,
    rewardsTableDataSource,
  };
};

export const transformNftsData = (
  data: string[][],
  statistics: [string, number][],
  nodes: TypeGetUserNftClaimRemarkNode[],
  network: NftClaimNetworks
) => {
  const csvRowsTotal: string[][] = [];
  const csvRowsClaimed: string[][] = [];
  const csvRowsUnclaim: string[][] = [];
  const csvRowsNewClaim: string[][] = [];
  let nftTableDataSource: TypeNftTableDataSource[] = [];

  const precision = network === NftClaimNetworks.CRAB ? KSM_PRECISIONS : DOT_PRECISIONS;

  for (let value of data) {
    const claim = nodes?.find(
      (v) => convertToSS58(v.signer, SUBSTRATE_PREFIX) === convertToSS58(value[0], SUBSTRATE_PREFIX)
    );
    const contribute = Big(value[1]).div(precision).toFixed(8);
    nftTableDataSource.push({
      key: 0,
      index: 0,
      address: value[0],
      totalContribute: contribute,
      claimAddress: claim ? { address: claim.addressValue, extrinsicHash: claim.extrinsicHash, network } : null,
      isClaimed: claim ? true : false,
    });
    csvRowsTotal.push([value[0], claim ? claim.addressValue : 'unclaim', contribute]);
    claim && ethers.utils.isAddress(claim.addressValue)
      ? csvRowsClaimed.push([value[0], claim.addressValue, contribute])
      : csvRowsUnclaim.push([value[0], contribute]);

    const statisticsItem = statistics.find((v) => v[0] === value[0]);
    if (statisticsItem) {
      if (claim && statisticsItem[1] === 0) {
        csvRowsNewClaim.push([value[0], claim.addressValue, contribute]);
      }
    } else {
      console.warn(`[Statistics]${value[0]} not found in`);
    }
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
    csvRowsNewClaim,
  };
};
