import React, { useState } from 'react';

import './NewTaskForm.css';

function NewTaskForm({ tasksArray, setTasksArray }) {
  const [formValue, setFormValue] = useState('');

  function handleFormInput(e) {
    setFormValue(() => {
      return e.target.value;
    });
  }

  function handleFormSubmit() {
    if (formValue.trim().length !== 0) {
      const randomId = tasksArray.length !== 0 ? tasksArray[tasksArray.length - 1].id + 1 : 1;
      const newTaskData = {
        id: randomId,
        description: formValue,
        status: 'active',
        creationTime: new Date(),
      };
      setTasksArray((data) => {
        return [...data, newTaskData];
      });
    }
  }

  function handleFormKeyDown(e) {
    if (e.key === 'Enter') {
      handleFormSubmit();
      setFormValue(() => '');
    }
  }

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      value={formValue}
      onChange={handleFormInput}
      onKeyDown={handleFormKeyDown}
    />
  );
}

export default NewTaskForm;
