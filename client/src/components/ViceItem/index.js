import React from "react";
import moment from "moment";
import Card from "./../Card/Card.jsx";
import CardHeader from "./../Card/CardHeader.jsx";
import CardBody from "./../Card/CardBody.jsx";
import Button from "./../CustomButtons/Button.jsx";
import Container from "./../Grid/GridContainer.jsx"

function DeleteButton(props) {
  if (props.handleDeleteButtonClick) {
    return <Button type="button" onClick={() => props.handleDeleteButtonClick(props.vice)}>
      X
    </Button>
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
   
   <Card style={{width: "max-content"}}>
  
      <CardHeader>Your Vice: {props.vice.name}</CardHeader>
      <CardBody>
      <p>Better Option: {props.vice.betteroption}</p>
      <p>
        Consumption this week: {weeklyCount}/{props.vice.limit}
      </p>
      <p>Consumption this month: {monthlyCount}</p>
      <p>Cost this month: ${(monthlyCount * props.vice.cost).toFixed(2)}</p>
      <Button type="button" onClick={() => props.handleButtonClick(props.vice)}>
        +
      </Button>
      <DeleteButton {...props} />
    
   </CardBody>
      </Card>
    
  );
}

export default ViceItem;
