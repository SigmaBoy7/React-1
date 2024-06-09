import { React, useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

import TaskEdit from '../TaskEdit';
import './Task.css';

function Task({ taskInfo, setTasksArray, onTaskDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [timer, setTimer] = useState(taskInfo.timer);
  const [isRunning, setIsRunning] = useState(false);
  const isTabHidden = document.hidden;

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        localStorage.setItem('timer', timer);
        setIsRunning(false);
      } else {
        const savedTimer = localStorage.getItem('timer');
        if (savedTimer) {
          setTimer(savedTimer);
        }
        setIsRunning(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timer]);

  useEffect(() => {
    let timerId;
    const [taskMin, taskSec] = timer.split(':').map(Number);
    if (isRunning) {
      timerId = setTimeout((min = taskMin, sec = taskSec) => {
        if (min === 0 && sec === 0) {
          clearTimeout(timerId);
          setIsRunning(() => false);
        } else {
          const newSec = sec === 0 ? 59 : sec - 1;
          const newMin = sec === 0 ? min - 1 : min;
          setTimer(`${String(newMin).padStart(2, '0')}:${String(newSec).padStart(2, '0')}`);
          setTimeout(newMin, newSec, 1000);
        }
      }, 1000);
    }
    return () => clearTimeout(timerId);
  }, [isRunning, timer, isTabHidden]);

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

  function handleClickStartTimer() {
    setIsRunning(true);
  }

  function handleClickPauseTimer() {
    setIsRunning(false);
  }

  const editBlock = isEditing ? (
    <TaskEdit taskInfo={taskInfo} setTasksArray={setTasksArray} handleClickEdit={handleClickEdit} />
  ) : null;

  const taskTimer =
    taskInfo.timer !== '00:00' && taskInfo.timer ? (
      <div className="description">
        <button onClick={handleClickStartTimer} className="icon icon-play"></button>
        <button onClick={handleClickPauseTimer} className="icon icon-pause"></button>
        <span className="time">{timer}</span>
      </div>
    ) : null;

  return (
    <li className={`task ${isEditing ? 'editing' : taskInfo.status}`}>
      {editBlock}
      <div className={'view'}>
        <input className="toggle" type="checkbox" onClick={handleClickComplete} />
        <div className="task-body">
          <span className="title">{taskInfo.title}</span>
          <span className="description"> {taskTimer}</span>
          <span className="description dates">
            <span className="created">Created {formatDistanceToNow(taskInfo.creationTime)} ago</span>
            {taskInfo.isChanged ? (
              <span className="created">Changed {formatDistanceToNow(taskInfo.changedTime)} ago</span>
            ) : null}
          </span>
        </div>
        <button className="icon icon-edit" onClick={handleClickEdit}></button>
        <button className="icon icon-destroy" onClick={handleClickDelete}></button>
      </div>
    </li>
  );
}

export default Task;
