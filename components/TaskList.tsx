import React from 'react';

interface TaskListProps {}

const TaskList: React.FC<TaskListProps> = () => {
  // TODO: implement task list UI
  return (
    <div className="task-list">
      <h2 className="text-2xl font-bold">Tasks</h2>
      <ul>
        {/* Tasks will be listed here */}
      </ul>
    </div>
  );
};

export default TaskList;
