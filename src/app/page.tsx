"use client";
import React, { useState, useEffect } from 'react';
import Timer from '../../components/Timer';
import TaskList from '../../components/TaskList';
import Settings from '../../components/Settings';

export default function Home() {
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [autoStart, setAutoStart] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const w = localStorage.getItem('workDuration');
    if (w) setWorkDuration(Number(w));
    const s = localStorage.getItem('shortBreak');
    if (s) setShortBreak(Number(s));
    const l = localStorage.getItem('longBreak');
    if (l) setLongBreak(Number(l));
    const a = localStorage.getItem('autoStart');
    if (a) setAutoStart(a === 'true');
    const hc = localStorage.getItem('highContrast');
    if (hc) setHighContrast(hc === 'true');
  }, []);

  // Persist settings
  useEffect(() => { localStorage.setItem('workDuration', workDuration.toString()); }, [workDuration]);
  useEffect(() => { localStorage.setItem('shortBreak', shortBreak.toString()); }, [shortBreak]);
  useEffect(() => { localStorage.setItem('longBreak', longBreak.toString()); }, [longBreak]);
  useEffect(() => { localStorage.setItem('autoStart', autoStart.toString()); }, [autoStart]);
  useEffect(() => { localStorage.setItem('highContrast', highContrast.toString()); }, [highContrast]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><button className="text-gray-600 hover:text-gray-900">Timer</button></li>
              <li><button className="text-gray-600 hover:text-gray-900">Tasks</button></li>
              <li><button className="text-gray-600 hover:text-gray-900">Settings</button></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4 flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Timer
          initialMinutes={workDuration}
          shortBreak={shortBreak}
          longBreak={longBreak}
          autoStart={autoStart}
          highContrast={highContrast}
        />
        <TaskList highContrast={highContrast} />
        <Settings
          workDuration={workDuration}
          setWorkDuration={setWorkDuration}
          shortBreak={shortBreak}
          setShortBreak={setShortBreak}
          longBreak={longBreak}
          setLongBreak={setLongBreak}
          autoStart={autoStart}
          setAutoStart={setAutoStart}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
        />
      </main>
      <footer className="bg-gray-100">
        <div className="container mx-auto p-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Pomodoro ADHD
        </div>
      </footer>
    </div>
  );
}
