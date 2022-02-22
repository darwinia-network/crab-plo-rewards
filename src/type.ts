export type TypeGetUsersContributePowerNode = {
  user: string;
  totalPower: string;
  contributors: {
    nodes: {
      powerRefer: string;
    }[];
  };
};

export type TypeGetUsersContributeBalanceNode = {
  user: string;
  totalBalance: string;
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

export type TypeNftTableDataSource = {
  key: number;
  index: number;
  address: string;
  ksmContribute: string;
  claimAddress: string;
  isClaimed: boolean;
};
