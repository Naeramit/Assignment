const taskService = require("../services/task-service");
const { countInspector } = require("../utils/countInspector");
const { selectedScore } = require("../utils/selectedScore");
const { specScore } = require("../utils/specScore");
const { randomItems } = require("../utils/randomItems");
exports.getInspector = async (req, res, next) => {
  try {
    const unShufffleUserIdArr = req.body.userId;

    const taskEachUser = await taskService.getTaskEachUser(unShufffleUserIdArr); // get history task of  user

    let inspectorEachUser = [];
    const accectDiffCount = 1;
    let diffCount = 100;
    // loop until all user have a inspector and difference of min and max below accept value
    while (
      inspectorEachUser.length != unShufffleUserIdArr.length &&
      diffCount > accectDiffCount
    ) {
      const userIdArr = unShufffleUserIdArr.sort(() => Math.random() - 0.5);
      inspectorEachUser = [];
      const usedInspector = [];

      // find inspector for the user.
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

        // sort inspector's amount
        const inspectorCountSorted = Object.values(summaryTaskInspector).sort(
          (a, b) => a - b
        );
        const inspectorCountSortedSet = inspectorCountSorted.reduce(
          (acc, cur) => {
            if (cur in acc) {
              return acc;
            }
            acc.push(cur);
            return acc;
          },
          []
        );

        // try selected from least count to higher
        for (let countValue of inspectorCountSortedSet) {
          //  select the  inspector to be candidate inspector
          const candidateInspector = [];
          for ([key, value] of Object.entries(summaryTaskInspector)) {
            if (
              usedInspector.indexOf(key) == -1 &&
              key != userId &&
              value == countValue
            ) {
              candidateInspector.push(key);
            }
          }

          if (candidateInspector.length != 0) {
            // random one user from candidate inspector
            const selectedInspector =
              candidateInspector[
                Math.floor(Math.random() * candidateInspector.length)
              ];
            // add  inspector for this user
            inspectorEachUser.push({
              userId: userId,
              inspectorId: selectedInspector,
              count: countValue,
            });

            // add usedInspector
            usedInspector.push(selectedInspector);
            break;
          }
        }
      }
      const minCount = inspectorEachUser.reduce((acc, cur) => {
        if (cur.count < acc) {
          return cur.count;
        } else {
          return acc;
        }
      }, 10000);
      const maxCount = inspectorEachUser.reduce((acc, cur) => {
        if (cur.count > acc) {
          return cur.count;
        } else {
          return acc;
        }
      }, 0);
      diffCount = maxCount - minCount;
    }
    res.json(inspectorEachUser);
  } catch (err) {
    res.json(err);
  }
};

exports.getMultiInspector = async (req, res, next) => {
  try {
    const unShufffleUserIdArr = req.body.userId;
    const numberPerGroup = req.body.number;

    const taskEachUser = await taskService.getTaskEachUser(unShufffleUserIdArr); // get history task of  user
    let cInspector = countInspector(unShufffleUserIdArr, taskEachUser);

    let sScore = selectedScore(cInspector);
    let spScore = specScore(sScore);
    let usedInspector = {};
    let maxUsedInspector = [];
    const sumSelectedInspector = {};
    for (user in spScore) {
      const spScoreEachUser = spScore[user];
      for (inspector of maxUsedInspector) {
        spScoreEachUser[inspector] = 0;
      }
      const selectedInspector = randomItems(spScoreEachUser, numberPerGroup);
      for (inspector of selectedInspector) {
        if (inspector in usedInspector) {
          usedInspector[inspector] += 1;
        } else {
          usedInspector[inspector] = 1;
        }
        if (usedInspector[inspector] >= numberPerGroup) {
          maxUsedInspector.push(inspector);
        }
      }
      sumSelectedInspector[user] = selectedInspector;
    }
    const rs = {};
    for (user in sumSelectedInspector) {
      const inpecstorStat = [];
      for (inspector of sumSelectedInspector[user]) {
        inpecstorStat.push({
          inspectorId: inspector,
          matchHistory: cInspector[user][inspector],
        });
      }
      rs[user] = inpecstorStat;
    }

    res.json(rs);
  } catch (err) {
    console.log(err);
  }
};
