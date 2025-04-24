"use client";

import React, { useState, useEffect, useRef } from 'react';

interface TimerProps {
  initialMinutes?: number;
  shortBreak?: number;
  longBreak?: number;
  autoStart?: boolean;
}

const Timer: React.FC<TimerProps> = ({
  initialMinutes = 25,
  shortBreak = 5,
  longBreak = 15,
  autoStart = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Session phase and cycle tracking
  const [phase, setPhase] = useState<'work' | 'short' | 'long'>('work');
  const [cycles, setCycles] = useState(0);

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
    setPhase('work');
    setCycles(0);
    setTimeLeft(initialMinutes * 60);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsActive(false);

      // Determine next phase
      if (phase === 'work') {
        const nextCycles = cycles + 1;
        setCycles(nextCycles);
        if (nextCycles % 4 === 0) {
          setPhase('long');
          setTimeLeft(longBreak * 60);
        } else {
          setPhase('short');
          setTimeLeft(shortBreak * 60);
        }
      } else {
        setPhase('work');
        setTimeLeft(initialMinutes * 60);
      }

      // Auto-start next session
      if (autoStart) {
        intervalRef.current = setInterval(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
        setIsActive(true);
      }
    }
  }, [timeLeft, phase, cycles, initialMinutes, shortBreak, longBreak, autoStart]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Progress circle calculations based on phase
  const totalSeconds =
    phase === 'work'
      ? initialMinutes * 60
      : phase === 'short'
      ? shortBreak * 60
      : longBreak * 60;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - timeLeft / totalSeconds);

  return (
    <div className="timer">
      <h2 className="text-2xl font-bold">
        {phase === 'work'
          ? 'Work'
          : phase === 'short'
          ? 'Short Break'
          : 'Long Break'}
      </h2>
      <div className="relative w-32 h-32 mx-auto mt-4">
        <svg className="-rotate-90" width="100%" height="100%" viewBox="0 0 120 120">
          <circle className="stroke-current text-gray-300" strokeWidth={8} fill="transparent" r={radius} cx={60} cy={60} />
          <circle className="stroke-current text-green-500" strokeWidth={8} fill="transparent" r={radius} cx={60} cy={60} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl font-bold">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
        </div>
      </div>
      <div className="flex space-x-2 mt-4 justify-center">
        <button onClick={handleStartPause} className={`px-4 py-2 text-white rounded ${isActive ? 'bg-yellow-500' : 'bg-green-500'}`}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-4 py-2 bg-red-500 text-white rounded">Reset</button>
      </div>
    </div>
  );
};

export default Timer;
