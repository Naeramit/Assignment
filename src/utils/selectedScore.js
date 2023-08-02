const aggregationFuction = (slope, constant) => {
  const linearFunction = (x) => {
    let ans = slope * x + constant;
    if (ans <= 0) {
      return 0.01;
    } else if (ans >= 1) {
      return 1;
    } else {
      return ans;
    }
  };
  return linearFunction;
};

const selectedScoreFunction = (countInspectorInEachUser) => {
  let min = 100000;
  let max = 0;
  for (inspector in countInspectorInEachUser) {
    if (countInspectorInEachUser[inspector] < min) {
      min = countInspectorInEachUser[inspector];
    }
    if (countInspectorInEachUser[inspector] > max) {
      max = countInspectorInEachUser[inspector];
    }
  }
  if (min - max == 0) {
    slope = 0;
  } else {
    slope = 1 / (min - max);
  }
  let constant = 1 - min * slope;
  return aggregationFuction(slope, constant);
};

const selectedScore = (countInspector) => {
  let userScore = {};
  for (user in countInspector) {
    const selectedScoreFunct = selectedScoreFunction(countInspector[user]);
    const selectedScoreEachInspector = {};
    for (inspector in countInspector[user]) {
      let score = selectedScoreFunct(countInspector[user][inspector]);
      selectedScoreEachInspector[inspector] = score;
    }
    userScore[user] = selectedScoreEachInspector;
  }
  return userScore;
};

exports.selectedScore = selectedScore;
