exports.specScore = (selectedScore) => {
  const sumScore = {};
  for (user in selectedScore) {
    for (inspector in selectedScore[user]) {
      if (inspector in sumScore) {
        sumScore[inspector] += selectedScore[user][inspector];
      } else {
        sumScore[inspector] = selectedScore[user][inspector];
      }
    }
  }
  const specScore = {};
  for (user in selectedScore) {
    const score = {};
    for (inspector in selectedScore[user]) {
      score[inspector] = selectedScore[user][inspector] / sumScore[inspector];
    }
    specScore[user] = score;
  }
  return specScore;
};
