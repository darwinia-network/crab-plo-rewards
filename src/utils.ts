import Big from 'big.js';
import { CRAB_REWARD, CKTON_REWARD, GLOBAL_TOTAL_CONTRIBUTE_POWER } from './config';
import type { TypeGetUsersContributePowerNode, TypeRewardsTableDataSource } from './type';

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

export const getCsvRowsAndTableData = (nodes: TypeGetUsersContributePowerNode[]) => {
  let totalCurrentCRab = Big(0);
  let totalCurrentCKton = Big(0);
  let totalStageCRab = Big(0);
  let totalStageCKTON = Big(0);
  const csvRows: string[][] = [];
  const rewardsTableDataSource: TypeRewardsTableDataSource[] = [];

  nodes?.forEach((value: TypeGetUsersContributePowerNode, index: number) => {
    const share = Big(value.totalPower).div(GLOBAL_TOTAL_CONTRIBUTE_POWER);
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
}