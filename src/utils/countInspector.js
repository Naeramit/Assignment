exports.countInspector = (userIdArr, taskEachUser) => {
  const summary = {};
  for (userId of userIdArr) {
    const summaryTaskInspector = {};
    // set start count value equal zero
    for (inspectorId of userIdArr) {
      if (inspectorId == userId) {
        continue;
      }
      summaryTaskInspector[inspectorId] = 0;
    }

    // count amount of inspector that used to inspect the user's assignment.
    for (task of taskEachUser) {
      if (task.userId != userId) {
        continue;
      }
      if (task.inspectorId in summaryTaskInspector) {
        summaryTaskInspector[task.inspectorId] += 1;
      }
    }
    summary[userId] = summaryTaskInspector;
  }
  return summary;
};
