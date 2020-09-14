import moment from "moment";
import React, { useState } from "react";

const Session = () => {
    const [breakLength, SetBreakLength] = useState(60 * 25)

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
    const breakLengthInMinutes = moment.duration(breakLength, 's').minutes()
    return (
        <div>
            <p id="session-label">Session</p>
            <p id="session-length">{breakLengthInMinutes}</p>
            <button onClick={decrementBreakLength}>-</button>
            <button onClick={incrementBreakLength}>+</button>
        </div>
    )
}

export default Session;
