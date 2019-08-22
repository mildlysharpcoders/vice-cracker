import React, { Component } from "react";

class noMatch extends Component {
  constructor(props) {
    super(props);
    this.thingy = {
      border: "1px"
    };
    this.thingy2 = {
      display: "flex",
      justifyContent: "space-between"
    };
    this.buttonWidth = {
      width: "50%",
      height: "30px"
    };

    let Photoinfo = new Image();
    let Meloninfo = new Image();
    Meloninfo.src = "/cheese-wedge.png";
    Photoinfo.src = "/something.jpg";

    this.state = {
      photo_x: 0,
      photo_y: 0,
      PhotoImg: Photoinfo,
      myCanvas: {},
      ctx: {},
      melon_x: 0,
      melon_y: 0,
      melonImg: Meloninfo,
      score: 0,
      melon_width: Meloninfo.width
    };
  }

  ImagesTouching = (x1, y1, img1, x2, y2, img2) => {
    if (x1 >= x2 + img2.width || x1 + img1.width <= x2) return false; // too far to the side
    if (y1 >= y2 + img2.height || y1 + img1.height <= y2) return false; // too far above/below
    return true; // otherwise, overlap
  };

  Do_a_Frame = () => {
    this.state.photo_y = this.state.myCanvas.height - this.state.PhotoImg.height;
    this.state.ctx.clearRect(
      0,
      0,
      this.state.myCanvas.width,
      this.state.myCanvas.height
    );

    this.state.ctx.fillText("Score: " + this.state.score, 10, 35);

    this.state.ctx.drawImage(
      this.state.PhotoImg,
      this.state.photo_x,
      this.state.photo_y
    );

    this.state.melon_y = this.state.melon_y + 5;
    if (this.state.melon_y > this.state.myCanvas.height) {
      this.state.melon_y = 0;
      this.state.melon_x =
        Math.random() * (this.state.myCanvas.width - this.state.melon_width);
    }
    this.state.ctx.drawImage(
      this.state.melonImg,
      this.state.melon_x,
      this.state.melon_y
    );

    if (
      this.ImagesTouching(
        this.state.photo_x,
        this.state.photo_y,
        this.state.PhotoImg,
        this.state.melon_x,
        this.state.melon_y,
        this.state.melonImg
      )
    ) {
      this.setState({ score: this.state.score + 1 });
      this.setState({ melon_x: -this.state.melonImg.width });
    }
  };

  startAnimation = () => {
    setInterval(this.Do_a_Frame, 25);
  };

  MyKeyDownHandler = MyEvent => {
    if (MyEvent.keyCode === 37 && this.state.photo_x > 0) {
      this.setState({ photo_x: this.state.photo_x - 10 });
    } // left
    if (
      MyEvent.keyCode === 39 &&
      this.state.photo_x + this.state.PhotoImg.width < this.state.myCanvas.width
    ) {
      this.setState({ photo_x: this.state.photo_x + 10 });
    } // right
  };

  ButtonClickHandler = MyEvent => {
    if (MyEvent.target.id === "leftButton" && this.state.photo_x > 0) {
      this.setState({ photo_x: this.state.photo_x - 10 });
    } // left
    if (
      MyEvent.target.id === "rightButton" &&
      this.state.photo_x + this.state.PhotoImg.width < this.state.myCanvas.width
    ) {
      this.setState({ photo_x: this.state.photo_x + 10 });
    } // right
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.MyKeyDownHandler);
    let myCanvas = document.getElementById("myCanvas");
    let ctx = myCanvas.getContext("2d");
    ctx.fillStyle = "aqua";
    ctx.font = "23px Arial";
    this.setState({ myCanvas, ctx });
    setTimeout(this.startAnimation(), 5000);
  };

  render() {
    return (
      <div height="100% - 40px" width="100%" className="FourPage">
        <canvas
          id="myCanvas"
          width={window.innerWidth}
          height={window.innerHeight - 48}
          style={this.thingy}
        />

        <div style={this.thingy2}>
          <button
            id="leftButton"
            onClick={this.ButtonClickHandler}
            style={this.buttonWidth}
          >
            &#8592;{" "}
          </button>
          <button
            id="rightButton"
            onClick={this.ButtonClickHandler}
            style={this.buttonWidth}
          >
            &#8594;
          </button>
        </div>
      </div>
    );
  }
}

export default noMatch;
