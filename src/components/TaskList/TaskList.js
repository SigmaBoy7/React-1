import React, {useState} from 'react';

import './TaskList.css';
import Task from '../Task';


function TaskList() {
    const [tasksData, setTasksData] = useState([
        {
          id: 1,
          description: 'Completed task',
          isComplete: false,
          isDelete: false
        },
        {
          id: 2,
          description: 'Editing task',
          isComplete: false,
          isDelete: false
        },
        {
          id: 3,
          description: 'Active task',
          isComplete: false,
          isDelete: false
        }
    ])

    function onTaskDelete(taskInfo){
        const filteredTaskList = tasksData.filter((item) => item.id !== taskInfo);
        console.log(filteredTaskList)
        setTasksData(filteredTaskList)
    }

    const tasksList = tasksData.map( data => 
        <Task key={data.id} data={data} onTaskDelete={onTaskDelete}/>
    )

    return (
        <ul className="todo-list">
            {tasksList}
        </ul>
    );
}

export default TaskList;