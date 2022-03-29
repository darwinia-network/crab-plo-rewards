import { transformRewardsData } from '../../utils';

onmessage = (ev) => {
  const dataSent = require('./dataSent.json');
  const result = transformRewardsData(ev.data[0], ev.data[1], dataSent);
  postMessage(result);
};
