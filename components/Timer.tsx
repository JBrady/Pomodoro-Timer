"use client";

import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialMinutes?: number;
}

const Timer: React.FC<TimerProps> = ({ initialMinutes = 25 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      <h2 className="text-2xl font-bold">Timer</h2>
      <p className="text-xl">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
      <div className="flex space-x-2 mt-4">
        {!isActive ? (
          <button onClick={() => setIsActive(true)} className="px-4 py-2 bg-green-500 text-white rounded">Start</button>
        ) : (
          <button onClick={() => setIsActive(false)} className="px-4 py-2 bg-yellow-500 text-white rounded">Pause</button>
        )}
        <button onClick={() => { setTimeLeft(initialMinutes * 60); setIsActive(false); }} className="px-4 py-2 bg-red-500 text-white rounded">Reset</button>
      </div>
    </div>
  );
};

export default Timer;
