import React, { useState } from 'react';

import './Task.css';

function Task({data, onTaskDelete}) {
    let [taskInfo, setTaskInfo] = useState(data);

    function handleClickComplete(){
        setTaskInfo(({isComplete}) => {
            return {
                ...taskInfo,
                isComplete: !isComplete
            }
        })
    }

    function handleClickDelete(){
        onTaskDelete(taskInfo.id)
    }

    return (
        <li className={`task ${taskInfo.isComplete ? 'complete' : 'active'}`}>
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
