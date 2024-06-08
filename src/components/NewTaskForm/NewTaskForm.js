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
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="Task"
        autoFocus
        value={formValue}
        onChange={handleFormInput}
        onKeyDown={handleFormKeyDown}
      />
      <input className="new-todo-form__timer" placeholder="Min" autoFocus />
      <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
    </form>
  );
}

export default NewTaskForm;
