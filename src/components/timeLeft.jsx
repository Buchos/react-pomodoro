import React, { useState, useEffect } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment)

const TimeLeft = ({
    breakLength, sessionLength
}) => {
    const [currentSessionType, setCurrentSessionType] = useState('Session'); // 'Session' or 'Break'
    const [intervalId, setIntervalId] = useState(null);
    const [TimeLeft, setTimeLeft] = useState(sessionLength);

    //change timeLeft when sessionLength change
    useEffect(() => {
        setTimeLeft(sessionLength);
    }, [sessionLength]);

    const isStarted = intervalId != null;

    const handleStartStopClick = () => {
        if (isStarted) {
            // if in started mode :
            // stop the timer
            //clearInterval
            clearInterval(intervalId);
            setIntervalId(null);


        } else {

            //if in stopped mode :
            //decrement timeLeft by one every second
            // use setInterval
            const newintervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => {
                    const newTimeLeft = prevTimeLeft - 1;
                    if (newTimeLeft >= 0) {
                        return prevTimeLeft - 1
                    }
                    // if session :
                    if (currentSessionType == 'Session') {
                        //switch to break
                        setCurrentSessionType('Break');
                        // set timeLeft to breakSessionLength
                        setTimeLeft(breakLength);
                    }



                    // if break : 
                    else if (currentSessionType == 'Break') {
                        //switch to session
                        setCurrentSessionType('Session');
                        // set timeLeft to sessionLength
                        setTimeLeft(sessionLength);
                    }
                })

            }, 100);
            setIntervalId(newintervalId);
        }
    }





    const formattedTimeLeft = moment.duration(TimeLeft, 's').format('mm:ss', { trim: false });
    return (
        <div>
            <p id="timer-label">
                {currentSessionType}
            </p>
            <p id="time-left">{formattedTimeLeft}</p>
            <button onClick={handleStartStopClick}>{isStarted ? 'STOP' : 'START'}</button>
        </div>

    )
}

export default TimeLeft
