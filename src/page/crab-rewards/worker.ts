import { transformRewardsData } from '../../utils';

onmessage = (ev) => {
  const result = transformRewardsData(ev.data[0], ev.data[1]);
  postMessage(result);
};
