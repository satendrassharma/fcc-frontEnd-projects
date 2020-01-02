import React, { useState, useRef, useEffect } from "react";
import "./Promodoro.css";
import {
  IoIosArrowRoundDown,
  IoIosArrowRoundUp,
  IoIosSync,
  IoMdPlay,
  IoMdPause
} from "react-icons/io";

export default function Promodoro() {
  const initialBreak = 5;
  const initialSession = 25;
  const [breaklength, setBreakLength] = useState(initialBreak);
  const [sessionlength, setSessionLength] = useState(initialSession);
  const [timer, setTimer] = useState(initialSession);
  const [isPlay, setIsPlay] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const audio = useRef(null);
  let intervalId = useRef(null);

  useEffect(() => {
    let time;
    if (isSession) {
      time = sessionlength;
    } else {
      time = breaklength;
    }
    setTimer(time);
  }, [isSession,sessionlength,breaklength]);
  const incrementBreakLength = e => {
    setBreakLength(prevState => {
      if (prevState < 60) {
        if (!isSession) {
          setTimer(prevState + 1);
        }
        return prevState + 1;
      }
      return prevState;
    });
  };

  const decrementBreakLength = e => {
    setBreakLength(prevState => {
      if (prevState > 1) {
        if (!isSession) {
          setTimer(prevState - 1);
        }
        return prevState - 1;
      }
      return prevState;
    });
  };

  const incrementSessionLength = e => {
    setSessionLength(prevState => {
      if (prevState < 60) {
        if (isSession) {
          setTimer(prevState + 1);
        }
        return prevState + 1;
      }
      return prevState;
    });
  };

  const decrementSessionLength = e => {
    setSessionLength(prevState => {
      if (prevState > 1) {
        if (isSession) {
          setTimer(prevState - 1);
        }
        return prevState - 1;
      }
      return prevState;
    });
  };

  const reset = e => {
    pauseTimer();
    audio.current.pause();
    audio.current.currentTime = 0;
    setTimer(initialSession);
    setBreakLength(initialBreak);
    setSessionLength(initialSession);
    setIsSession(true);
  };

  const playTimer = () => {
    setIsPlay(true);
    intervalId.current = setInterval(() => {
      console.log("timer is running");
      setTimer(prevState => {
        if (prevState - 1 / 60 < 0) {
          console.log(audio);
          audio.current.play();
          audio.current.currentTime = 0;
        }
        if (prevState - 1 / 60 <= 0) {
          setIsSession(prevtype => {
            return !prevtype;
          });
          return prevState;
        }
        return prevState - 1 / 60;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsPlay(false);
    clearInterval(intervalId.current);
  };

  const getTimeLeft = timer => {
    let timeleft = timer * 60;
    let mm = padToTwo(Math.floor(timeleft / 60));
    let ss = padToTwo(Math.floor(timeleft % 60));
    console.log(`${mm}:${ss}`);
    return `${mm}:${ss}`;
  };

  const padToTwo = number => {
    if (number <= 99) {
      number = ("0" + number).slice(-2);
    }
    return number;
  };

  return (
    <div className="App">
      <header>PomoDoro Clock</header>
      <div id="clock">
        <div id="break-label">
          <h3>Break length</h3>
          <div className="actions">
            <div
              id="break-decrement"
              onClick={decrementBreakLength}
              className={isPlay ? "disablediv" : ""}
            >
              <IoIosArrowRoundDown size={25} />
            </div>
            <div id="break-length">{breaklength}</div>
            <div
              id="break-increment"
              onClick={incrementBreakLength}
              className={isPlay ? "disablediv" : ""}
            >
              <IoIosArrowRoundUp size={25} />
            </div>
          </div>
        </div>
        <div id="session-label">
          <h3>Session length</h3>
          <div className="actions">
            <div
              id="session-decrement"
              onClick={decrementSessionLength}
              className={isPlay ? "disablediv" : ""}
            >
              <IoIosArrowRoundDown size={25} />
            </div>
            <div id="session-length">{sessionlength}</div>
            <div
              id="session-increment"
              onClick={incrementSessionLength}
              className={isPlay ? "disablediv" : ""}
            >
              <IoIosArrowRoundUp size={25} />
            </div>
          </div>
        </div>
        <div id="timer-label">
          <h1>{isSession ? "Session" : "Break"}</h1>
          <div id="time-left">{getTimeLeft(timer)}</div>
          <div id="actions">
            <span id="start_stop" onClick={isPlay ? pauseTimer : playTimer}>
              {isPlay ? <IoMdPause size={25} /> : <IoMdPlay size={25} />}
            </span>
            <span
              id="reset"
              // className={isPlay ? "disablediv" : ""}
              onClick={reset}
            >
              <IoIosSync size={25} />
            </span>
          </div>
        </div>
      </div>
      <audio src="https://goo.gl/65cBl1" ref={audio} id="beep"></audio>
    </div>
  );
}
