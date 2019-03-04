import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import "./CountdownDigit.css";

export default class CountDownWithAnimation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ show: false });
    }
  }

  render() {
    return (
      <CSSTransition
        in={this.state.show}
        timeout={1000}
        classNames="digit"
        unmountOnExit
        onExited={() => this.setState({ show: true })}
      >
        <div className="digit">{this.props.value}</div>
      </CSSTransition>
    );
  }
}
