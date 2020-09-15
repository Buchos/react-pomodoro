/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
import moment from "moment";
import React from "react";

const Break = ({
    isStarted,
    breakLength,
    decrementBreakLength,
    incrementBreakLength,
}) => {
    const breakLengthInMinutes = moment.duration(breakLength, "s").minutes();
    return (
        <div>
            <p id="break-label">Break</p>
            <p id="break-length">{breakLengthInMinutes}</p>
            <button disabled={isStarted} onClick={decrementBreakLength}>-</button>
            <button disabled={isStarted} onClick={incrementBreakLength}>+</button>
        </div>
    );
};

export default Break;
