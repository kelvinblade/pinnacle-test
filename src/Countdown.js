import React, { Component } from 'react';

export default class CountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remainingSecond: props.remainingSecond,
      remainingFormattedTime: this.secondsToFormattedTime(props.remainingSecond)
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

  initializeState = (props) => {
    this.setState({
      remainingSecond: props.remainingSecond,
      remainingFormattedTime: this.secondsToFormattedTime(props.remainingSecond)
    })
  }

  startCountDown = () => {
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  }

  resetTimer = () => {
    if (this.timer) clearInterval(this.timer);
  }

  secondsToFormattedTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let minutesDivisor = secs % (60 * 60);
    let minutes = Math.floor(minutesDivisor / 60);

    let secondsDivisor = minutesDivisor % 60;
    let seconds = Math.ceil(secondsDivisor);

    const hoursStr = this.addLeadingZero(hours)
    const minutesStr = this.addLeadingZero(minutes)
    const secondsStr = this.addLeadingZero(seconds)

    return `${hoursStr}:${minutesStr}:${secondsStr}` ;
  }

  addLeadingZero = (unit) => unit > 9 ? unit : `0${unit}`;

  decrementTimeRemaining = () => {
    if (this.state.remainingSecond > 0) {
      this.setState({
        remainingSecond: this.state.remainingSecond - 1,
        remainingFormattedTime: this.secondsToFormattedTime(this.state.remainingSecond - 1)
      });
    } else {
      this.resetTimer();
      this.props.onComplete && this.props.onComplete();
    }
  };

  render() {
    return (
      <div>{this.state.remainingFormattedTime}</div>
    );
  }
}