/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
import moment from "moment";
import React from "react";

const Session = ({
    isStarted,
    sessionLength,
    decrementSessionLength,
    incrementSessionLength,
}) => {
    const sessionLengthInMinutes = moment
        .duration(sessionLength, "s")
        .minutes();
    return (
        <div>
            <p id="session-label">Session</p>
            <p id="session-length">{sessionLengthInMinutes}</p>
            <button disabled={isStarted} onClick={decrementSessionLength}>-</button>
            <button disabled={isStarted} onClick={incrementSessionLength}>+</button>
        </div>
    );
};

export default Session;
