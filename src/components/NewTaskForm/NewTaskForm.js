import React, { useState } from 'react';
import './NewTaskForm.css';

function NewTaskForm({ tasksArray, setTasksArray }) {
  const [formValue, setFormValue] = useState({
    title: '',
    timer: {
      min: '',
      sec: '',
    },
  });

  function handleTitleInput(e) {
    const { value } = e.target;
    setFormValue((prevValue) => ({
      ...prevValue,
      title: value,
    }));
  }

  function handleMinInput(e) {
    const { value } = e.target;
    setFormValue((prevValue) => ({
      ...prevValue,
      timer: {
        ...prevValue.timer,
        min: value,
      },
    }));
  }

  function handleSecInput(e) {
    let { value } = e.target;

    if (value > 59) {
      value = 59;
      e.target = 59;
    }

    setFormValue((prevValue) => ({
      ...prevValue,
      timer: {
        ...prevValue.timer,
        sec: value,
      },
    }));
  }

  function handleFormSubmit(e) {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    if (formValue.title.trim().length !== 0) {
      const randomId = tasksArray.length !== 0 ? tasksArray[tasksArray.length - 1].id + 1 : 1;
      const newTaskData = {
        id: randomId,
        title: formValue.title,
        timer: `${formValue.timer.min ? formValue.timer.min : '00'}:${formValue.timer.sec ? formValue.timer.sec : '00'}`,
        status: 'active',
        creationTime: new Date(),
      };
      setTasksArray((data) => [...data, newTaskData]);
      setFormValue({
        title: '',
        timer: {
          min: '',
          sec: '',
        },
      });
    }
  }

  function handleFormKeyDown(e) {
    if (e.key === 'Enter') {
      handleFormSubmit(e);
    }
  }

  return (
    <div className="new-todo-form" onKeyDown={handleFormKeyDown}>
      <input className="new-todo" placeholder="Task" autoFocus value={formValue.title} onChange={handleTitleInput} />
      <input
        type="number"
        onChange={handleMinInput}
        value={formValue.timer.min}
        className="new-todo-form__timer"
        placeholder="Min"
      />
      <input
        type="number"
        onChange={handleSecInput}
        value={formValue.timer.sec}
        className="new-todo-form__timer"
        placeholder="Sec"
      />
    </div>
  );
}

export default NewTaskForm;
