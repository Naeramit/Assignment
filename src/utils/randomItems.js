exports.randomItems = (items, selectedAmount) => {
  const selectedItems = [];
  const candindateItems = { ...items };
  for (let i = 1; i <= selectedAmount; i++) {
    let sumScore = 0;
    for (score of Object.values(candindateItems)) {
      sumScore += score;
    }
    if (sumScore > 0) {
      const randomValue = Math.random() * sumScore;
      let baseValue = 0;
      for (let item in candindateItems) {
        baseValue += candindateItems[item];
        if (randomValue <= baseValue) {
          selectedItems.push(item);
          candindateItems[item] = 0;
          break;
        }
      }
    } else {
      const inspectors = Object.keys(candindateItems);
      const randomValue = Math.floor(Math.random() * inspectors.length);
      selectedItems.push(inspectors[randomValue]);
    }
  }
  return selectedItems;
};
