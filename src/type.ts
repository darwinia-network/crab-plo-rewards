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
  crabRewards: string;
  cktonRewards: string;
  stageCRabRewards: string;
  stageCKtonRewards: string;
};

export enum NftClaimNetworks {
  CRAB,
  DARWINIA,
}

export type TypeNftTableDataSource = {
  key: number;
  index: number;
  address: string;
  totalContribute: string;
  claimAddress: { address: string; extrinsicHash: string; network: NftClaimNetworks } | null;
  isClaimed: boolean;
};
