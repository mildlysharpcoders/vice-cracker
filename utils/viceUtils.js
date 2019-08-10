const moment = require("moment");

function getWeeklyConsumption(vice) {
  let today = moment();
  let thisWeek = today.weekday(0).format("YYYY-MM-DD");
  let consumption = vice.weekly.find(item => {
    return item.week === thisWeek;
  });
  let count = 0;
  if (consumption) {
    count = consumption.count;
  }
  return count;
}

module.exports = { getWeeklyConsumption };
