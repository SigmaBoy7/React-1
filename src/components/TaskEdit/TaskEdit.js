import { React, useState } from 'react';

function TaskEdit({ taskInfo, setTasksArray, handleClickEdit }) {
  const [editedInfo, setEditedInfo] = useState('');
  function inputSubmit() {
    if (editedInfo.trim().length !== 0) {
      const newTaskData = {
        id: taskInfo.id,
        description: editedInfo,
        status: taskInfo.status,
        creationTime: taskInfo.creationTime,
        changedTime: new Date(),
        isChanged: true,
      };
      setTasksArray((data) => {
        const oldTask = data.indexOf(taskInfo);
        console.log([[data.slice(0, oldTask)], newTaskData, [data.slice(oldTask)]]);
        return [...data.slice(0, oldTask), newTaskData, ...data.slice(oldTask + 1)];
      });
    }
  }

  function handleFormKeyDown(e) {
    if (e.key === 'Enter') {
      inputSubmit();
      setEditedInfo(() => '');
      handleClickEdit();
    }
  }

  function handleFormInput(e) {
    setEditedInfo(() => e.target.value);
  }

  return (
    <input type="text" className="edit" onKeyDown={handleFormKeyDown} onChange={handleFormInput} value={editedInfo} />
  );
}

export default TaskEdit;
