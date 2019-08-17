const moment = require("moment");

function getThisWeek() {
  return moment().weekday(0).format("YYYY-MM-DD");
}

function getWeeklyConsumption(vice) {
  let thisWeek = getThisWeek();
  let consumption = vice.weekly.find(item => {
    return item.week === thisWeek;
  });
  let count = 0;
  if (consumption) {
    count = consumption.count;
  }
  return count;
}

function getStreakLength(vice) {
  let thisWeek = getThisWeek();
  const weekly = vice.weekly.sort((a, b) => a.week < b.week);
  let streak = 0;
  for (let i = 0; i < weekly.length; i++) {
    if (weekly[i].count <= vice.limit) {
      // Don't count the current week in streaks
      if (weekly[i].week !== thisWeek) {
        streak++;
      }
    } else {
      break;
    }
  }
  return streak;
}

module.exports = { getWeeklyConsumption, getStreakLength };
