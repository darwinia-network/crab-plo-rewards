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

export type TypeGetUserNftClaimRemarkNode = {
  signer: string;
  addressValue: string;
  extrinsicHash: string;
};

export type TypeGetUsersNFTClaimRemark = {
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
  edges: { node: TypeGetUserNftClaimRemarkNode }[];
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
