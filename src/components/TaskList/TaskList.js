import React from 'react';

import './TaskList.css';
import Task from '../Task';

function TaskList({ tasksArray, setTasksArray, onTaskDelete }) {
  function createTasksComponents() {
    const tasksComponents = tasksArray.map((taskInfo) => (
      <Task key={taskInfo.id} taskInfo={taskInfo} setTasksArray={setTasksArray} onTaskDelete={onTaskDelete} />
    ));
    return tasksComponents;
  }

  return <ul className="todo-list">{createTasksComponents()}</ul>;
}

export default TaskList;
