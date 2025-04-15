// src/hooks/useTimer.js
import { useState, useEffect } from 'react';

export const useTimer = (initialTime, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (onTimeUp) onTimeUp();
    }
    
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning, onTimeUp]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = (newTime = initialTime) => {
    setTimeLeft(newTime);
    setIsRunning(false);
  };

  return {
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer
  };
};

export default useTimer;
