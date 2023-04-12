import Big from 'big.js';
import { gql } from '@apollo/client';

export const CRAB_REWARD = 200000000;
export const CKTON_REWARD = 8000;
export const STAGE_REWARDS_RATE = 0.075; // 7.5%
export const MIN_KSM_REWARDS = new Big('0.00000001');
export const DOT_PRECISIONS = new Big('10000000000');
export const KSM_PRECISIONS = new Big('1000000000000');
export const CRAB_PRECISIONS = new Big('1000000000');
export const SUBSTRATE_PREFIX = 42;

export const GET_USERS_CLAIM_REMARKS = gql`
  query GetUserClaimRemarks($first: Int!, $after: String!) {
    claimRemarksConnection(orderBy: [blockNumber_ASC], first: $first, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          signer
          addressValue
          extrinsicHash
        }
      }
    }
  }
`;

export const GET_USERS_CLAIM_REMARKS_TRY = gql`
  query GetUserClaimRemarks($first: Int!) {
    claimRemarksConnection(orderBy: [blockNumber_ASC], first: $first) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          signer
          addressValue
          extrinsicHash
        }
      }
    }
  }
`;
