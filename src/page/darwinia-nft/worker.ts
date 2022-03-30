import { transformNftsData } from '../../utils';
import { NftClaimNetworks } from '../../type';

onmessage = (ev) => {
  const { data } = require('./data');
  const result = transformNftsData(data, ev.data, NftClaimNetworks.DARWINIA);
  postMessage(result);
};
