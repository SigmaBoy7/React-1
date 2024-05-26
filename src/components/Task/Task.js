import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';

function Task({ creationTime, taskInfo, setTasksArray, onTaskDelete }) {
  const [taskTimeSinceCreation] = useState(() => {
    return formatDistanceToNow(creationTime);
  });

  function handleClickComplete() {
    const newTaskData = {
      ...taskInfo,
      status: taskInfo.status !== 'active' ? 'active' : 'complete',
    };

    setTasksArray((tasksData) => {
      const firstHalfOfData = tasksData.slice(0, tasksData.indexOf(taskInfo));
      const secondHalfOfData = tasksData.slice(tasksData.indexOf(taskInfo) + 1);
      return [...firstHalfOfData, newTaskData, ...secondHalfOfData];
    });
  }

  function handleClickDelete() {
    onTaskDelete(taskInfo);
  }

  return (
    <li className={`task ${taskInfo.status}`}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={handleClickComplete} />
        <label>
          <span className="description">{taskInfo.description}</span>
          <span className="created">created {taskTimeSinceCreation} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={handleClickDelete}></button>
      </div>
    </li>
  );
}

export default Task;
