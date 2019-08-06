import React from "react";
import moment from "moment";

function ViceItem(props) {
  let today = moment();
  let thisWeek = today.weekday(0).format("YYYY-MM-DD");
  let consumption = props.vice.weekly.find(item => {
    return item.week === thisWeek;
  });
  let count = 0;
  if (consumption) {
      count = consumption.count;
  }

  return (
    <div>
      <h3>{props.vice.name}</h3>
      <p>{count}/{props.vice.limit}</p>
      <button type="button" onClick={() => props.handleButtonClick(props.vice)}>
        +
      </button>
    </div>
  );
}

export default ViceItem;
