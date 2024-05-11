import React from 'react';

import './TaskList.css';
import Task from '../Task';


function TaskList({tasksData}) {
    const tasksList = tasksData.map( data => 
        <Task key={data.id} data={data} />
    )
    return (
        <ul className="todo-list">
            {tasksList}
        </ul>
    );
}

export default TaskList;