import React from "react";
import moment from "moment";
import Card from "./../Card/Card.jsx";
import CardHeader from "./../Card/CardHeader.jsx";
import CardBody from "./../Card/CardBody.jsx";

function DeleteButton(props) {
  if (props.handleDeleteButtonClick) {
    return <button type="button" onClick={() => props.handleDeleteButtonClick(props.vice)}>
      X
    </button>
  } else {
    return <></>
  }
}

function ViceItem(props) {
  let today = moment();
  let thisWeek = today.weekday(0).format("YYYY-MM-DD");
  let thisMonth = today.format("YYYY-MM");
  let weeklyConsumption = props.vice.weekly.find(item => {
    return item.week === thisWeek;
  });
  let monthlyConsumption = props.vice.monthly.find(item => {
    return item.month === thisMonth;
  });
  let weeklyCount = 0;
  if (weeklyConsumption) {
    weeklyCount = weeklyConsumption.count;
  }
  let monthlyCount = 0;
  if (monthlyConsumption) {
    monthlyCount = monthlyConsumption.count;
  }

  return (
   <Card>
  
      <h3>Your Vice: {props.vice.name}</h3>
      <p>Better Option: {props.vice.betteroption}</p>
      <p>
        Consumption this week: {weeklyCount}/{props.vice.limit}
      </p>
      <p>Consumption this month: {monthlyCount}</p>
      <p>Cost this month: ${(monthlyCount * props.vice.cost).toFixed(2)}</p>
      <button type="button" onClick={() => props.handleButtonClick(props.vice)}>
        +
      </button>
      <DeleteButton {...props} />
    
   
      </Card>
  );
}

export default ViceItem;
