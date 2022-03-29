import { transformNftsData } from '../../utils';

onmessage = (ev) => {
  const { data } = require('./data');
  const result = transformNftsData(data, ev.data);
  postMessage(result);
};
