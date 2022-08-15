import { transformNftsData } from '../../utils';
import { NftClaimNetworks } from '../../type';

onmessage = (ev) => {
  const { data } = require('./data');
  const { statistics } = require('./statistics');
  const result = transformNftsData(data, statistics, ev.data, NftClaimNetworks.CRAB);
  postMessage(result);
};
