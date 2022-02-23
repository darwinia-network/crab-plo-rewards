import Big from 'big.js';
import { ethers } from 'ethers';
import { CRAB_REWARD, CKTON_REWARD, GLOBAL_TOTAL_CONTRIBUTE_POWER, KSM_PRECISIONS } from './config';
import type { TypeGetUsersContributePowerNode, TypeGetUserNftClaimedNode, TypeRewardsTableDataSource, TypeNftTableDataSource } from './type';

export const shortAddress = (address = "") => {
  if (address.length && address.length > 12) {
    return `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;
  }
  return address;
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

export const transformRewardsData = (nodes: TypeGetUsersContributePowerNode[]) => {
  let totalCurrentCRab = Big(0);
  let totalCurrentCKton = Big(0);
  let totalStageCRab = Big(0);
  let totalStageCKTON = Big(0);
  const csvRows: string[][] = [];
  const rewardsTableDataSource: TypeRewardsTableDataSource[] = [];

  nodes?.forEach((value: TypeGetUsersContributePowerNode, index: number) => {
    const referPower = value.contributors.nodes.reduce((previous, current) => Big(previous).add(current.powerRefer).toString(), '0');
    const share = Big(value.totalPower).add(referPower).div(GLOBAL_TOTAL_CONTRIBUTE_POWER);
    const currentCRabReward = share.times(CRAB_REWARD);
    const currentCKtonReward = share.times(CKTON_REWARD);
    const stageCRabReward = currentCRabReward.times(0.1);
    const stageCKtonReward = currentCKtonReward.times(0.1);

    totalCurrentCRab = totalCurrentCRab.add(currentCRabReward);
    totalCurrentCKton = totalCurrentCKton.add(currentCKtonReward);
    totalStageCRab = totalStageCRab.add(stageCRabReward);
    totalStageCKTON = totalStageCKTON.add(stageCKtonReward);

    csvRows.push([value.user, 'ring', stageCRabReward.toFixed(8), 'kusama']);
    csvRows.push([value.user, 'kton', stageCKtonReward.toFixed(8), 'kusama']);

    rewardsTableDataSource.push({
      key: index,
      index: nodes?.length - index,
      address: value.user,
      currentCRabRewards: currentCRabReward.toFixed(8),
      stageCRabRewards: stageCRabReward.toFixed(8),
      currentCKtonRewards: currentCKtonReward.toFixed(8),
      stageCKtonRewards: stageCKtonReward.toFixed(8),
    });
  });

  return {
    csvRows, rewardsTableDataSource,
    totalCurrentCRab, totalCurrentCKton,
    totalStageCRab, totalStageCKTON,
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

