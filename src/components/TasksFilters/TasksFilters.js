import React from 'react';

import './TasksFilter.css';

function TasksFilters({ tasksFilter, setTasksFilter }) {
  function handlFilterClick(e) {
    setTasksFilter((prevFilter) => {
      if (prevFilter === e.target.value) {
        return 'all';
      }
      return e.target.value;
    });
  }
  return (
    <ul className="filters">
      <li>
        <button value={'all'} className={tasksFilter === 'all' ? 'selected' : 'unselected'} onClick={handlFilterClick}>
          All
        </button>
      </li>
      <li>
        <button
          value={'active'}
          className={tasksFilter === 'active' ? 'selected' : 'unselected'}
          onClick={handlFilterClick}
        >
          Active
        </button>
      </li>
      <li>
        <button
          value={'complete'}
          className={tasksFilter === 'complete' ? 'selected' : 'unselected'}
          onClick={handlFilterClick}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TasksFilters;
