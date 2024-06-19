import { React, useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

import TaskEdit from '../TaskEdit';

import './Task.css';

function Task({ taskInfo, setTasksArray, onTaskDelete, tasksFilter, isTaskChanged, setIsTaskChanged }) {
  const [isEditing, setIsEditing] = useState(false);
  const [timer, setTimer] = useState(taskInfo.timer);
  const [isRunning, setIsRunning] = useState(false);

  const isTabHidden = document.hidden;

  function subtractSecondsFromTimer(timer, secondsToSubtract) {
    const [currentMinutes, currentSeconds] = timer.split(':').map(Number);
    let totalSeconds = currentMinutes * 60 + currentSeconds;
    totalSeconds -= secondsToSubtract;
    if (totalSeconds < 0) {
      totalSeconds = 0; // Таймер не может быть отрицательным
    }

    const newMinutes = Math.floor(totalSeconds / 60);
    const newSeconds = totalSeconds % 60;
    const formattedMinutes = String(newMinutes).padStart(2, '0');
    const formattedSeconds = String(newSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && taskInfo.timer !== '00:00') {
        localStorage.setItem(`timer ${taskInfo.id}`, timer);
        setIsRunning(false);
      } else {
        const savedTimer = localStorage.getItem(`timer ${taskInfo.id}`);
        const lastSavedTimer = localStorage.getItem(`lastTimeSaved ${taskInfo.id}`);
        if (savedTimer) {
          const currentTime = new Date();
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0, поэтому добавляем 1
          const day = String(today.getDate()).padStart(2, '0'); // Дни начинаются с 1
          const savedTimerDate = new Date(`${year}-${month}-${day}T${lastSavedTimer}`);
          const difference = currentTime.getTime() - savedTimerDate.getTime();
          let secondsDifference = Math.floor(difference / 1000);

          if (localStorage.getItem('isRunning') === 'false' || !localStorage.getItem('isRunning')) {
            secondsDifference = 0;
          }

          setTimer(subtractSecondsFromTimer(savedTimer, secondsDifference));
          if (localStorage.getItem('isRunning') === 'true') {
            setIsRunning(true);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timer]);

  useEffect(() => {
    setTimer(taskInfo.timer);
    setIsTaskChanged(false);
  }, [isTaskChanged]);

  useEffect(() => {
    if (taskInfo.timer !== '00:00') {
      const savedTimer = localStorage.getItem(`lastTimeSaved ${taskInfo.id}`);
      if (savedTimer) {
        const currentTime = new Date();
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0, поэтому добавляем 1
        const day = String(today.getDate()).padStart(2, '0'); // Дни начинаются с 1
        const savedTimerDate = new Date(`${year}-${month}-${day}T${savedTimer}`);
        const difference = currentTime.getTime() - savedTimerDate.getTime();
        let secondsDifference = Math.floor(difference / 1000);

        if (localStorage.getItem('isRunning') === 'false' || !localStorage.getItem('isRunning')) {
          secondsDifference = 0;
        }

        setTimer(subtractSecondsFromTimer(localStorage.getItem(`timer ${taskInfo.id}`), secondsDifference));
      }
    }
  }, [tasksFilter]);

  useEffect(() => {
    if (localStorage.getItem('isRunning') === 'true') {
      setIsRunning(true);
    }
  }, []);

  useEffect(() => {
    if (timer === '00:00' && taskInfo.timer !== '00:00') {
      handleClickComplete();
    }

    if (taskInfo.timer !== '00:00') {
      localStorage.setItem(`timer ${taskInfo.id}`, timer);
    }
    return () => {
      if (taskInfo.timer !== '00:00') {
        localStorage.setItem(`lastTimeSaved ${taskInfo.id}`, new Date().toLocaleTimeString());
      }
    };
  }, [timer]);

  useEffect(() => {
    if (taskInfo.timer !== '00:00') {
      let timerId;
      const [taskMin, taskSec] = timer.split(':').map(Number);
      if (isRunning) {
        timerId = setTimeout(() => {
          if (taskMin === 0 && taskSec === 0) {
            clearTimeout(timerId);
            setIsRunning(false);
          } else {
            const newSec = taskSec === 0 ? 59 : taskSec - 1;
            const newMin = taskSec === 0 ? taskMin - 1 : taskMin;

            setTimer(`${String(newMin).padStart(2, '0')}:${String(newSec).padStart(2, '0')}`);
          }
        }, 1000);
      }
      return () => {
        clearTimeout(timerId);
        if (isRunning) {
          localStorage.setItem(`lastTimeSaved ${taskInfo.id}`, new Date().toLocaleTimeString());
        }
      };
    }
  }, [isRunning, timer, isTabHidden]);

  function handleClickComplete() {
    const newTaskData = {
      ...taskInfo,
      status: taskInfo.status !== 'active' ? 'active' : 'complete',
      timer: '00:00',
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
    localStorage.setItem(`lastTimeSaved ${taskInfo.id}`, new Date().toLocaleTimeString());
    localStorage.setItem('isRunning', true);
  }

  function handleClickPauseTimer() {
    setIsRunning(false);
    localStorage.setItem(`timer ${taskInfo.id}`, timer);
    localStorage.setItem(`lastTimeSaved ${taskInfo.id}`, new Date().toLocaleTimeString());
    localStorage.setItem('isRunning', false);
  }

  const editBlock = isEditing ? (
    <TaskEdit
      setIsTaskChanged={setIsTaskChanged}
      taskInfo={taskInfo}
      setTasksArray={setTasksArray}
      handleClickEdit={handleClickEdit}
    />
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
        <input
          checked={taskInfo.status === 'complete' ? true : false}
          className="toggle"
          type="checkbox"
          onChange={handleClickComplete}
        />
        <div className="task-body">
          <span className="title">{taskInfo.title}</span>
          <span className="description"> {taskTimer}</span>
          <span className="description dates">
            <span className="created">Created {formatDistanceToNow(taskInfo.creationTime)} ago</span>
          </span>
        </div>
        <button className="icon icon-edit" onClick={handleClickEdit}></button>
        <button className="icon icon-destroy" onClick={handleClickDelete}></button>
      </div>
    </li>
  );
}

export default Task;
