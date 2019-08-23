import React from "react";
import moment from "moment";
import Card from "./../Card/Card.jsx";
import CardHeader from "./../Card/CardHeader.jsx";
import CardBody from "./../Card/CardBody.jsx";
import Button from "./../CustomButtons/Button.jsx";

function DeleteButton(props) {
  if (props.handleDeleteButtonClick) {
    return <Button
      color="rose"
      round
      type="button" onClick={() => props.handleDeleteButtonClick(props.vice)}>
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

  let fontWeight = {
    fontWeight: "500",
    fontSize: 17
  }
  let percentageWeight = {
    fontWeight: "bolder",
    fontSize: 18
  }
  let fontFamily4 = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 20,
    fontWeight: "600"
  }


  return (
    <Card style={{ width: "fit-content" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardHeader style={{ width: "fit-content" }}>{props.vice.name}</CardHeader>
      </div>
      <CardBody>
        <p> <span style={fontFamily4}>Better Option:</span> <span style={fontWeight}> {props.vice.betteroption}
          </span>
        </p>
        <hr />
        <p>
          <span style={fontFamily4}> Weekly Consumption: </span> <span style={fontWeight}>  {weeklyCount}/{props.vice.limit}
          </span>
        </p>
        <p>
          <span style={fontWeight}>aka </span> <span style={percentageWeight}> {((weeklyCount / props.vice.limit) * 100).toFixed(1)}% </span>
        </p>
        <hr />
        <p><span style={fontFamily4}>Monthly Consumption:</span><span style={fontWeight}> {monthlyCount}</span></p>
        <p><span style={fontFamily4}>Monthly Cost: </span>  <span style={fontWeight}>  ${(monthlyCount * props.vice.cost).toFixed(2)}</span></p>
        <Button
          color="primary"
          round
          type="button" onClick={() => props.handleButtonClick(props.vice)}>
          +
      </Button>
        <DeleteButton
          {...props} />

      </CardBody>
    </Card>

  );
}

export default ViceItem;
