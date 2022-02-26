import Big from 'big.js';
import { gql } from "@apollo/client";

export const CRAB_REWARD = 200000000;
export const CKTON_REWARD = 8000;

export const KSM_PRECISIONS = new Big("1000000000000");

export const GET_CONTRIBUTORS_POWER = gql`
  query GetContributorsPower($first: Int!, $offset: Int!) {
    crowdloanWhoStatistics(orderBy: TOTAL_BALANCE_DESC, first: $first, offset: $offset) {
      totalCount
      pageInfo{
        hasNextPage
      }
      nodes {
        user
        totalPower
        totalBalance
      }
    }
  }
`;

export const GET_REFERRALS_POWER = gql`
  query GetReferralsPower($first: Int!, $offset: Int!) {
    crowdloanReferStatistics(first: $first, offset: $offset) {
      totalCount
      pageInfo {
        hasNextPage
      }
      nodes {
        user
        totalPower
        totalBalance
      }
    }
  }
`;

export const GET_USERS_NFT_CLAIMED = gql`
  query GetUserNftClaimed($first: Int!, $offset: Int!) {
    remarkedNftAddresses(orderBy: [EXTRINSIC_TIMESTAMP_ASC], first: $first, offset: $offset) {
      totalCount
      pageInfo {
        hasNextPage
      }
      nodes {
        signer
        addressValue
        extrinsicHash
      }
    }
  }
`;
