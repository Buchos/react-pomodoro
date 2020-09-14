import moment from "moment";
import React, { useState } from "react";

const Break = () => {
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
    const breakLengthInMinutes = moment.duration(breakLength, 's').minutes()
    return (
        <div>
            <p id="break-label">Break</p>
            <p id="break-length">{breakLengthInMinutes}</p>
            <button onClick={decrementBreakLength}>-</button>
            <button onClick={incrementBreakLength}>+</button>
        </div>
    )
}

export default Break;
