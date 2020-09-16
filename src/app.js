/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from "react";
import Break from "./components/break";
import Session from "./components/session";
import TimeLeft from "./components/timeLeft";
import moment from "moment";

function App() {
  const audioElement = useRef(null);
  const [sessionLength, SetSessionLength] = useState(60 * 25);
  const [breakLength, SetBreakLength] = useState(300);
  const [IntervalId, setIntervalId] = useState(null);
  const [currentSessionType, setCurrentSessionType] = useState("Session"); // 'Session' or 'Break'
  const [timeLeft, setTimeLeft] = useState(sessionLength);


  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  const formattedTitleTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });

  useEffect(() => {
    document.title = `${formattedTitleTimeLeft} | ${currentSessionType} - PomodoReact`;
  }, [formattedTitleTimeLeft]);

  useEffect(() => {
    // if timeLeft is zero
    if (timeLeft === 0) {
      // play the audio
      audioElement.current.play(); // optional chaining
      // change session to break or break to session
      if (currentSessionType === "Session") {
        setCurrentSessionType("Break");
        setTimeLeft(breakLength);
      } else if (currentSessionType === "Break") {
        setCurrentSessionType("Session");
        setTimeLeft(sessionLength);
      }
    }
  }, [breakLength, currentSessionType, sessionLength, timeLeft]);

  const decrementBreakLength = () => {
    const newBreakLength = breakLength - 60;

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
    const newSessionLength = sessionLength - 60;

    if (newSessionLength < 0) {
      SetSessionLength(0);
    } else {
      SetSessionLength(newSessionLength);
    }
  };

  const incrementSessionLength = () => {
    SetSessionLength(sessionLength + 60);
  };

  const isStarted = IntervalId !== null;
  const handleStartStopClick = () => {
    if (isStarted) {
      //stop decrementation
      clearInterval(IntervalId);
      setIntervalId(null);
    } else {
      //decrement time left by one every second (1000ms)
      const newIntervalId = setInterval(() => {
        setTimeLeft(previousTimeLeft => previousTimeLeft - 1);
      }, 30);
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    // reset audio
    audioElement.current.load()


    //clear the timeout interval
    clearInterval(IntervalId)

    // set the intervalId to null
    setIntervalId(null)

    // set the session type to 'Session'
    setCurrentSessionType('Session')

    // reset the session length to 25 min
    SetSessionLength(60 * 25)

    // reset the break length to 5 min
    SetBreakLength(5 * 60)

    // reset the timer to 25 min as default session length
    setTimeLeft(25 * 60)

  };

  return (
    <div className="App">
      <Break
        breakLength={breakLength}
        decrementBreakLength={decrementBreakLength}
        incrementBreakLength={incrementBreakLength}
        isStarted={isStarted}
      />
      <TimeLeft
        breakLength={breakLength}
        currentSessionType={currentSessionType}
        setCurrentSessionType={setCurrentSessionType}
        sessionLength={sessionLength}
        handleStartStopClick={handleStartStopClick}
        startStopBtn={isStarted ? "Stop" : "Start"}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
      />
      <Session
        sessionLength={sessionLength}
        decrementSessionLength={decrementSessionLength}
        incrementSessionLength={incrementSessionLength}
        isStarted={isStarted}

      />
      <button id="reset" onClick={handleResetButtonClick}>RESET</button>
      <audio id="beep" ref={audioElement}>
        <source src="https://onlineclock.net/audio/option/default.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
