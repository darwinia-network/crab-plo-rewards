export type TypeReferralsNode = {
  user: string;
  totalPower: string;
  totalBalance: string;
};

export type TypeContributorsNode = {
  user: string;
  totalPower: string;
  totalBalance: string;
};

export type TypeGetUserNftClaimedNode = {
  signer: string;
  addressValue: string;
  extrinsicHash: string;
};

export type TypeGetUsersNftClaimed = {
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
  };
  nodes: TypeGetUserNftClaimedNode[];
};

export type TypeRewardsTableDataSource = {
  key: number;
  index: number;
  address: string;
  ksmAsContributor: string;
  ksmAsReferral: string;
  stageCRabRewards: string;
  stageCKtonRewards: string;
  sentCRab: string;
  sentKton: string;
  differCrab: string;
  differKton: string;
};

export type TypeNftTableDataSource = {
  key: number;
  index: number;
  address: string;
  ksmContribute: string;
  claimAddress: { address: string, extrinsicHash: string } | null;
  isClaimed: boolean;
};
