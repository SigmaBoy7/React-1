import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import TaskEdit from '../TaskEdit';
import './Task.css';

function Task({ taskInfo, setTasksArray, onTaskDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleClickComplete(e) {
    e.stopPropagation();
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

  function handleClickEdit() {
    setIsEditing((prevValue) => !prevValue);
  }

  const editBlock = isEditing ? (
    <TaskEdit taskInfo={taskInfo} setTasksArray={setTasksArray} handleClickEdit={handleClickEdit} />
  ) : null;

  return (
    <li className={`task ${isEditing ? 'editing' : taskInfo.status}`}>
      {editBlock}
      <div className={'view'}>
        <input className="toggle" type="checkbox" onClick={handleClickComplete} />
        <label>
          <span className="title">{taskInfo.description}</span>
          <span className="description">
            <button className="icon icon-play"></button>
            <button className="icon icon-pause"></button>
            <span className="time"> 12:25</span>
          </span>
          <span className="description">
            <span className="created">Created {formatDistanceToNow(taskInfo.creationTime)} ago</span>
            {taskInfo.isChanged ? (
              <span className="created">Changed {formatDistanceToNow(taskInfo.changedTime)} ago</span>
            ) : null}
          </span>
        </label>
        <button className="icon icon-edit" onClick={handleClickEdit}></button>
        <button className="icon icon-destroy" onClick={handleClickDelete}></button>
      </div>
    </li>
  );
}

export default Task;
