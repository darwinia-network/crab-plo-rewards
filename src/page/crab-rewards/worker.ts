import { transformRewardsData } from '../../utils';

onmessage = () => {
  const crowdloanWhoStatistics = require('./data/crowdloanWhoStatistics.json');
  const crowdloanReferStatistics = require('./data/crowdloanReferStatistics.json');
  const result = transformRewardsData(
    crowdloanWhoStatistics.data.crowdloanWhoStatistics.nodes,
    crowdloanReferStatistics.data.crowdloanReferStatistics.nodes
  );
  postMessage(result);
};
