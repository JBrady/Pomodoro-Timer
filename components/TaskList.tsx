"use client";

import React, { useState, useEffect } from 'react';

interface Task { id: string; text: string; completed: boolean; }
interface TaskListProps { highContrast?: boolean; }

const TaskList: React.FC<TaskListProps> = ({ highContrast = false }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // Load tasks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);
  const [newTaskText, setNewTaskText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  // Persist tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = { id: Date.now().toString(), text: newTaskText.trim(), completed: false };
    setTasks(prev => [...prev, newTask]);
    setNewTaskText('');
  };

  const toggleComplete = (id: string) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const saveEdit = (id: string) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, text: editingText } : task));
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className={`task-list p-4 border rounded ${highContrast ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h2 className="text-2xl font-bold mb-2">Tasks</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          className="flex-1 border rounded px-2 py-1 mr-2"
          placeholder="New task"
          aria-label="New task"
        />
        <button onClick={addTask} className="px-4 py-1 bg-blue-500 text-white rounded" aria-label="Add new task">Add</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                aria-label={`Mark task ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
              />
              {editingId === task.id ? (
                <input
                  className="border rounded px-1 py-0.5"
                  value={editingText}
                  onChange={e => setEditingText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveEdit(task.id)}
                  aria-label="Edit task"
                />
              ) : (
                <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
              )}
            </div>
            <div className="flex space-x-2">
              {editingId === task.id ? (
                <>
                  <button onClick={() => saveEdit(task.id)} className="text-green-500" aria-label={`Save changes for task ${task.text}`}>Save</button>
                  <button onClick={cancelEdit} className="text-gray-500" aria-label="Cancel editing">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEditing(task)} className="text-yellow-500" aria-label={`Edit task ${task.text}`}>Edit</button>
                  <button onClick={() => deleteTask(task.id)} className="text-red-500" aria-label={`Delete task ${task.text}`}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
