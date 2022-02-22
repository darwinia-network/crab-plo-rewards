export type TypeGetUsersContributePowerNode = {
  user: string;
  totalPower: string;
  contributors: {
    nodes: {
      powerRefer: string;
    }[];
  };
};

export type TypeRewardsTableDataSource = {
  key: number;
  index: number;
  address: string;
  currentCKtonRewards: string;
  stageCKtonRewards: string;
  currentCRabRewards: string;
  stageCRabRewards: string;
};
