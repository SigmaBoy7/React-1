import React from 'react';

import './Task.css';

function Task({taskInfo, setTasksArray, onTaskDelete}) {

    function handleClickComplete(){
        const newTaskData = {
            ...taskInfo,
            status: taskInfo.status !== 'active' ? 'active' : 'complete',
        }

        setTasksArray((tasksData) => {
            const firstHalfOfData = tasksData.slice(0, tasksData.indexOf(taskInfo))
            const secondHalfOfData = tasksData.slice(tasksData.indexOf(taskInfo) + 1)
            return [
                ...firstHalfOfData,
                newTaskData,
                ...secondHalfOfData
            ]
        })
    }

    function handleClickDelete(){
        onTaskDelete(taskInfo)
    }

    return (
        <li className={`task ${taskInfo.status}`}>
            <div className="view">
                <input className="toggle" type="checkbox" onClick={handleClickComplete}/>
                <label>
                <span className="description">{taskInfo.description}</span>
                <span className="created">created 17 seconds ago</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"
                    onClick={handleClickDelete}
                ></button>
            </div>
        </li>
    );
}

export default Task;
