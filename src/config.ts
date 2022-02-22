import Big from 'big.js';
import { gql } from "@apollo/client";

export const CRAB_REWARD = 200000000;
export const CKTON_REWARD = 8000;

// Power: 7099040920573355
// Balance: 7553777745215274 => 7,553.777745215274 KSM
export const GLOBAL_TOTAL_CONTRIBUTE_POWER = new Big("7099040920573355");

export const GET_USERS_CONTRIBUTE_POWER = gql`
  query GetUsersContributePower($first: Int!, $offset: Int!) {
    crowdloanWhoStatistics(orderBy: TOTAL_BALANCE_DESC, first: $first, offset: $offset) {
      totalCount
      pageInfo{
        hasNextPage
      }
      nodes {
        user
        totalPower
        contributors {
          nodes {
            powerRefer
          }
        }
      }
    }
  }
`;
