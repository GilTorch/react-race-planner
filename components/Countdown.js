import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

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

  return hoursInString + minutesInString + secondsInString;
}

export default function Cowntdown() {
  const [timeLeft, setTimeLeft] = useState('0:10');

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
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{timeLeft}</Text>
    </View>
  );
}
