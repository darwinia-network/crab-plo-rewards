import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, u8aToHex } from "@polkadot/util";
import { Keyring } from "@polkadot/keyring";
import Big from 'big.js';
import { ethers } from 'ethers';
import { CRAB_REWARD, CKTON_REWARD, KSM_PRECISIONS } from './config';
import type {
  TypeGetUserNftClaimedNode,
  TypeContributorsNode, TypeReferralsNode,
  TypeRewardsTableDataSource, TypeNftTableDataSource
} from './type';

export const shortAddress = (address = "") => {
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
  const file = new Blob(["\ufeff" + data], { type: type });
  const url = URL.createObjectURL(file);

  const a = document.createElement("a");
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(function() {
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

  nodesReferral.forEach(node => {
    totalPower = totalPower.add(node.totalPower);
  });
  nodesContributor.forEach(node => {
    totalPower = totalPower.add(node.totalPower);
    totalBalance = totalBalance.add(node.totalBalance);
  });

  nodesContributor.forEach((nodeContributor) => {
    const nodeReferral = nodesReferral.find(v => v.user === polkadotAddressToPublicKey(nodeContributor.user));
    const share = Big(nodeContributor.totalPower).add(nodeReferral ? nodeReferral.totalPower : 0).div(totalPower);

    const stageCRabReward = share.times(CRAB_REWARD).times(0.1);
    const stageCKtonReward = share.times(CKTON_REWARD).times(0.1);

    totalStageCRab = totalStageCRab.add(stageCRabReward);
    totalStageCKton = totalStageCKton.add(stageCKtonReward);

    // csvRows.push([nodeContributor.user, 'ring', stageCRabReward.toFixed(8), 'kusama']);
    // csvRows.push([nodeContributor.user, 'kton', stageCKtonReward.toFixed(8), 'kusama']);

    rewardsTableDataSource.push({
      key: rewardsTableDataSource.length,
      index: rewardsTableDataSource.length + 1,
      address: nodeContributor.user,
      ksmAsContributor: Big(nodeContributor.totalBalance).div(KSM_PRECISIONS).toFixed(8),
      ksmAsReferral: Big(nodeReferral ? nodeReferral.totalBalance : 0).div(KSM_PRECISIONS).toFixed(8),
      stageCRabRewards: stageCRabReward.toFixed(8),
      stageCKtonRewards: stageCKtonReward.toFixed(8),
      sentCRab: 'Todo',
      sentKton: 'Todo',
    });
  });

  nodesReferral.forEach((nodeReferral) => {
    const address = publicKeyToPolkadotAddress(nodeReferral.user);
    if (!rewardsTableDataSource.find(v => v.address === address)) {
      const share = Big(nodeReferral.totalPower).div(totalPower);
      const stageCRabReward = share.times(CRAB_REWARD).times(0.1);
      const stageCKtonReward = share.times(CKTON_REWARD).times(0.1);

      totalStageCRab = totalStageCRab.add(stageCRabReward);
      totalStageCKton = totalStageCKton.add(stageCKtonReward);

      // csvRows.push([address, 'ring', stageCRabReward.toFixed(8), 'kusama']);
      // csvRows.push([address, 'kton', stageCKtonReward.toFixed(8), 'kusama']);

      rewardsTableDataSource.push({
        key: rewardsTableDataSource.length,
        index: rewardsTableDataSource.length + 1,
        address: address,
        ksmAsContributor: Big(0).toFixed(8),
        ksmAsReferral: Big(nodeReferral.totalBalance).div(KSM_PRECISIONS).toFixed(8),
        stageCRabRewards: stageCRabReward.toFixed(8),
        stageCKtonRewards: stageCKtonReward.toFixed(8),
        sentCRab: 'Todo',
        sentKton: 'Todo',
      });
    }
  });

  return {
    totalPower, totalBalance,
    csvRows, rewardsTableDataSource,
    totalStageCRab, totalStageCKton,
  };
};

export const transformNftsData = (data: string[][], nodes: TypeGetUserNftClaimedNode[]) => {
  const csvRows: string[] = [];
  let nftTableDataSource: TypeNftTableDataSource[] = [];

  for (let value of data) {
    const claim = nodes?.find(v => v.signer === value[0]);
    nftTableDataSource.push({
      key: 0,
      index: 0,
      address: value[0],
      ksmContribute: Big(value[1]).div(KSM_PRECISIONS).toFixed(8),
      claimAddress: claim ? { address: claim.addressValue, extrinsicHash: claim.extrinsicHash } : null,
      isClaimed: claim ? true :false,
    });
    claim && ethers.utils.isAddress(claim.addressValue) && csvRows.push(claim.addressValue);
  }

  nftTableDataSource = nftTableDataSource.map((value, index) => ({
    ...value,
    key: index,
    index: nftTableDataSource.length - index,
  }));

  return {
    csvRows, nftTableDataSource,
  };
};

