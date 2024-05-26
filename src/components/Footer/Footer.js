import React from 'react';

import './Footer.css';
import TasksFilter from '../TasksFilters';

function Footer({ tasksFilter, tasksArray, setTasksFilter, setTasksArray }) {
  function handleClearButtonClick() {
    setTasksArray((data) => {
      const clearedTasksData = data.filter((task) => task.status !== 'complete');
      return clearedTasksData;
    });
  }

  function activeTasksCount() {
    const count = tasksArray.reduce((accumulator, currentValue) => {
      if (currentValue.status !== 'complete') {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    return count;
  }

  return (
    <footer className="footer">
      <span className="todo-count">{activeTasksCount()} items left</span>
      <TasksFilter tasksFilter={tasksFilter} setTasksFilter={setTasksFilter} />
      <button onClick={handleClearButtonClick} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
