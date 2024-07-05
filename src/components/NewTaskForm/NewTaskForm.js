import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './NewTaskForm.css';

function NewTaskForm({ setTasksArray }) {
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
    let { value } = e.target;

    if (value < 0) {
      value = 0;
    }

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

    if (value < 0) {
      value = 0;
    }

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
      const min = formValue.timer.min.length < 2 ? '0' + formValue.timer.min : formValue.timer.min;
      const sec = formValue.timer.sec.length < 2 ? '0' + formValue.timer.sec : formValue.timer.sec;

      const newTaskData = {
        id: uuidv4(),
        title: formValue.title,
        timer: `${min ? min : '00'}:${sec ? sec : '00'}`,
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
    <form className="new-todo-form" onKeyDown={handleFormKeyDown}>
      <input className="new-todo" placeholder="Task" autoFocus value={formValue.title} onChange={handleTitleInput} />
      <input
        min={0}
        type="number"
        onChange={handleMinInput}
        value={formValue.timer.min}
        className="new-todo-form__timer"
        placeholder="Min"
      />
      <input
        min={0}
        type="number"
        onChange={handleSecInput}
        value={formValue.timer.sec}
        className="new-todo-form__timer"
        placeholder="Sec"
      />
    </form>
  );
}

export default NewTaskForm;
