import React from 'react';

import './TaskList.css';
import Task from '../Task';

function TaskList({selectedFilter, tasksArray, setTasksArray}) {

    function onTaskDelete(taskInfo){
        const filteredTaskList = tasksArray.filter((item) => item.id !== taskInfo.id);
        setTasksArray((tasksArray) => filteredTaskList)
    }

    function createTasksComponents() {
        const tasksComponents = tasksArray
            .filter(taskInfo => selectedFilter === 'all' || taskInfo.status === selectedFilter)
            .map(taskInfo => (
                <Task key={taskInfo.id} taskInfo={taskInfo} setTasksArray={setTasksArray} onTaskDelete={onTaskDelete} />
            ));
        return tasksComponents;
    }

    return (
        <ul className="todo-list">
            {createTasksComponents()}
        </ul>
    );
}

export default TaskList;