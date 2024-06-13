import React, { useEffect } from 'react';

import './TaskList.css';
import Task from '../Task';

function TaskList({ tasksArray, setTasksArray, onTaskDelete, tasksFilter, isTaskChanged, setIsTaskChanged }) {
  useEffect(() => {
    return localStorage.clear();
  }, []);

  function createTasksComponents() {
    const tasksComponents = tasksArray.map((taskInfo) => (
      <Task
        isTaskChanged={isTaskChanged}
        setIsTaskChanged={setIsTaskChanged}
        tasksFilter={tasksFilter}
        key={taskInfo.id}
        taskInfo={taskInfo}
        setTasksArray={setTasksArray}
        onTaskDelete={onTaskDelete}
      />
    ));
    return tasksComponents;
  }

  return <ul className="todo-list">{createTasksComponents()}</ul>;
}

export default TaskList;
