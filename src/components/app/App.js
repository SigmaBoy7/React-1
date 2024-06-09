import React, { useState } from 'react';

import './App.css';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

function App() {
  const [tasksArray, setTasksArray] = useState([
    {
      id: 1,
      title: 'Completed task',
      status: 'active',
      creationTime: 'Wed May 20 2024 19:39:25 GMT+0500',
      timer: '00:00',
    },
    {
      id: 2,
      title: 'Editing task',
      status: 'active',
      creationTime: 'Wed May 22 2024 19:42:25 GMT+0500',
      timer: '00:00',
    },
    {
      id: 3,
      title: 'Active task',
      status: 'complete',
      creationTime: 'Wed May 22 2024 19:42:25 GMT+0500',
      timer: '00:00',
    },
  ]);
  const [tasksFilter, setTasksFilter] = useState('all');

  function filterTaskArray() {
    const filteredTaskArray = tasksArray.filter((taskInfo) => tasksFilter === 'all' || taskInfo.status === tasksFilter);
    return filteredTaskArray;
  }

  function onTaskDelete(taskInfo) {
    const filteredTaskList = tasksArray.filter((item) => item.id !== taskInfo.id);
    setTasksArray(() => filteredTaskList);
  }

  return (
    <div className="todoapp">
      <header>
        <h1>todos</h1>
        <NewTaskForm tasksArray={tasksArray} setTasksArray={setTasksArray}></NewTaskForm>
      </header>
      <section className="main">
        <TaskList onTaskDelete={onTaskDelete} tasksArray={filterTaskArray()} setTasksArray={setTasksArray}></TaskList>
      </section>
      <Footer
        tasksFilter={tasksFilter}
        setTasksFilter={setTasksFilter}
        tasksArray={tasksArray}
        setTasksArray={setTasksArray}
      ></Footer>
    </div>
  );
}

export default App;
