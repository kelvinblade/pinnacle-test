import React, { Component } from "react";
// import Countdown from "./Countdown";
import CountdownWithAnimation from "./CountdownWithAnimation";

class App extends Component {
  state = {
    remainingSecond: 100000
  };

  render() {
    return (
      <div className="App">
        <CountdownWithAnimation
          remainingSecond={this.state.remainingSecond}
          // onComplete={() => alert("Done")}
        />
        {/* <Countdown remainingSecond={this.state.remainingSecond} /> */}
        {/* <Countdown remainingSecond={this.state.remainingSecond} onComplete={() => alert("Done")} /> */}
      </div>
    );
  }
}

export default App;
