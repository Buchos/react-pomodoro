/* eslint-disable unicorn/filename-case */
/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);


const TimeLeft = ({
    currentSessionType,
    handleStartStopClick,
    startStopBtn,
    timeLeft,
}) => {


    const formattedTimeLeft = moment
        .duration(timeLeft, "s")
        .format("mm:ss", { trim: false });

    return (
        <div>
            <p>{currentSessionType} : Time Left</p>
            {formattedTimeLeft}
            <button onClick={handleStartStopClick}>{startStopBtn}</button>
        </div>
    );
};

export default TimeLeft;
