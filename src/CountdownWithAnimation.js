import React, { Component } from "react";
import CountdownDigit from "./CountdownDigit";

export default class CountDownWithAnimation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remainingSecond: props.remainingSecond,
      remainingFormattedTime: this.secondsToTimeArray(props.remainingSecond)
    };
  }

  componentDidMount() {
    this.startCountDown();
  }

  componentWillUnmount() {
    this.resetTimer();
  }

  componentWillReceiveProps(nextProps) {
    this.resetTimer();
    this.initializeState(nextProps);
    this.startCountDown();
  }

  initializeState = props => {
    this.setState({
      remainingSecond: props.remainingSecond,
      remainingFormattedTime: this.secondsToTimeArray(props.remainingSecond)
    });
  };

  startCountDown = () => {
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  };

  resetTimer = () => {
    if (this.timer) clearInterval(this.timer);
  };

  secondsToTimeArray = secs => {
    let hours = Math.floor(secs / (60 * 60));

    let minutesDivisor = secs % (60 * 60);
    let minutes = Math.floor(minutesDivisor / 60);

    let secondsDivisor = minutesDivisor % 60;
    let seconds = Math.ceil(secondsDivisor);

    const secondsUnit = seconds % 10;
    const secondsTenth = Math.floor(seconds / 10);
    const minutesUnit = minutes % 10;
    const minutesTenth = Math.floor(minutes / 10);
    const hoursUnit = hours % 10;
    const hoursTenth = Math.floor(hours / 10);

    return [
      hoursTenth,
      hoursUnit,
      ":",
      minutesTenth,
      minutesUnit,
      ":",
      secondsTenth,
      secondsUnit
    ];
  };

  decrementTimeRemaining = () => {
    if (this.state.remainingSecond > 0) {
      this.setState({
        remainingSecond: this.state.remainingSecond - 1,
        remainingFormattedTime: this.secondsToTimeArray(
          this.state.remainingSecond - 1
        )
      });
    } else {
      this.resetTimer();
      this.props.onComplete && this.props.onComplete();
    }
  };

  render() {
    return (
      <div>
        {this.state.remainingFormattedTime.map((time, index) => (
          <CountdownDigit key={index} value={time} />
        ))}
      </div>
    );
  }
}
