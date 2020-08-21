import React, { useState, useEffect } from 'react';
import { ViewPropTypes } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';

function converTimeInSeconds(timeInString) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  const timeArray = timeInString.split(':');

  if (timeArray.length === 2) {
    const [minutesString, secondString] = timeArray;
    minutes = parseInt(minutesString, 10);
    seconds = parseInt(secondString, 10);
  } else {
    const [hoursString, minutesString, secondString] = timeArray;
    hours = parseInt(hoursString, 10);
    minutes = parseInt(minutesString, 10);
    seconds = parseInt(secondString, 10);
  }

  return hours * 60 * 60 + minutes * 60 + seconds;
}

function converTimeInString(timeInSeconds) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  hours = Math.floor(timeInSeconds / (60 * 60));
  minutes = Math.floor((timeInSeconds - hours * 60 * 60) / 60);
  seconds = timeInSeconds - hours * 60 * 60 - minutes * 60;

  const hoursInString = hours < 10 ? `0${hours}:` : `${hours}:`;
  const minutesInString = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
  const secondsInString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return (hours > 0 ? hoursInString : '') + minutesInString + secondsInString;
}

function Countdown({ style, countdownTimeInSeconds }) {
  const [timeLeft, setTimeLeft] = useState(converTimeInString(countdownTimeInSeconds));

  useEffect(() => {
    const interValId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const timeInSeconds = converTimeInSeconds(prevTimeLeft);

        let timeInString;

        if (timeInSeconds > 0) {
          const timeLeftInSeconds = timeInSeconds - 1;
          timeInString = converTimeInString(timeLeftInSeconds);
        } else {
          timeInString = prevTimeLeft;

          clearInterval(interValId);
        }

        return timeInString;
      });
    }, 1000);

    return () => clearInterval(interValId);
  }, []);

  return <Text style={{ ...style }}>{timeLeft}</Text>;
}

Countdown.propTypes = {
  style: ViewPropTypes.style,
  countdownTimeInSeconds: PropTypes.number.isRequired,
};

Countdown.defaultProps = {
  style: {},
};

export default Countdown;
