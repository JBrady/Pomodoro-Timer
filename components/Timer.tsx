"use client";

import React, { useState, useEffect, useRef } from 'react';

interface TimerProps {
  initialMinutes?: number;
}

const Timer: React.FC<TimerProps> = ({ initialMinutes = 25 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartPause = () => {
    if (isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsActive(false);
    } else {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      setIsActive(true);
    }
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setTimeLeft(initialMinutes * 60);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsActive(false);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      <h2 className="text-2xl font-bold">Timer</h2>
      <p className="text-xl">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
      <div className="flex space-x-2 mt-4">
        <button onClick={handleStartPause} className={`px-4 py-2 text-white rounded ${isActive ? 'bg-yellow-500' : 'bg-green-500'}`}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-4 py-2 bg-red-500 text-white rounded">Reset</button>
      </div>
    </div>
  );
};

export default Timer;
