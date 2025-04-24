"use client";
import React, { useState } from 'react';
import Timer from '../../components/Timer';
import TaskList from '../../components/TaskList';
import Settings from '../../components/Settings';

export default function Home() {
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [autoStart, setAutoStart] = useState(false);

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
      <main className="container mx-auto p-4 flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
        <Timer
          initialMinutes={workDuration}
          shortBreak={shortBreak}
          longBreak={longBreak}
          autoStart={autoStart}
        />
        <TaskList />
        <Settings
          workDuration={workDuration}
          setWorkDuration={setWorkDuration}
          shortBreak={shortBreak}
          setShortBreak={setShortBreak}
          longBreak={longBreak}
          setLongBreak={setLongBreak}
          autoStart={autoStart}
          setAutoStart={setAutoStart}
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
