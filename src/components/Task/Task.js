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
          <span className="description">{taskInfo.description}</span>
          <div className="date">
            <span className="created">Created {formatDistanceToNow(taskInfo.creationTime)} ago</span>
            {taskInfo.isChanged ? (
              <span className="created">Changed {formatDistanceToNow(taskInfo.changedTime)} ago</span>
            ) : null}
          </div>
        </label>
        <button className="icon icon-edit" onClick={handleClickEdit}></button>
        <button className="icon icon-destroy" onClick={handleClickDelete}></button>
      </div>
    </li>
  );
}

export default Task;
