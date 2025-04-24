"use client";
import React from 'react';

interface SettingsProps {
  workDuration: number;
  setWorkDuration: (n: number) => void;
  shortBreak: number;
  setShortBreak: (n: number) => void;
  longBreak: number;
  setLongBreak: (n: number) => void;
  autoStart: boolean;
  setAutoStart: (b: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({
  workDuration,
  setWorkDuration,
  shortBreak,
  setShortBreak,
  longBreak,
  setLongBreak,
  autoStart,
  setAutoStart,
}) => (
  <div className="settings p-4 border rounded">
    <h2 className="text-2xl font-bold mb-4">Settings</h2>
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <label className="w-40">Work Duration (min):</label>
        <input
          type="number"
          min={1}
          value={workDuration}
          onChange={e => setWorkDuration(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label className="w-40">Short Break (min):</label>
        <input
          type="number"
          min={1}
          value={shortBreak}
          onChange={e => setShortBreak(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label className="w-40">Long Break (min):</label>
        <input
          type="number"
          min={1}
          value={longBreak}
          onChange={e => setLongBreak(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={autoStart}
          id="autoStart"
          onChange={e => setAutoStart(e.target.checked)}
        />
        <label htmlFor="autoStart">Auto-start next session</label>
      </div>
    </div>
  </div>
);

export default Settings;
