import React, { useState } from "react";
import Break from "./components/break.jsx";
import Session from "./components/session.jsx";
import TimeLeft from "./components/timeLeft.jsx";

function App() {
  const [sessionLength, SetSessionLength] = useState(60 * 25)

  const [breakLength, SetBreakLength] = useState(60 * 5)

  const decrementBreakLength = () => {
    const newBreakLength = breakLength - 60

    if (newBreakLength < 0) {
      SetBreakLength(0);
    } else {
      SetBreakLength(newBreakLength);
    }
  };

  const incrementBreakLength = () => {
    SetBreakLength(breakLength + 60);
  };

  const decrementSessionLength = () => {
    const newSessionLength = sessionLength - 60

    if (newSessionLength < 0) {
      SetSessionLength(0);
    } else {
      SetSessionLength(newSessionLength);
    }
  };

  const incrementSessionLength = () => {
    SetSessionLength(sessionLength + 60);
  };

  return (

    <div className="App">
      <Break
        breakLength={breakLength}
        decrementBreakLength={decrementBreakLength}
        incrementBreakLength={incrementBreakLength}
      />
      <TimeLeft
        sessionLength={sessionLength}
        breakLength={breakLength}

      />
      <Session
        sessionLength={sessionLength}
        decrementSessionLength={decrementSessionLength}
        incrementSessionLength={incrementSessionLength}
      />
    </div>

  );
}

export default App;
