import { React, useState } from 'react';

function TaskEdit({ taskInfo, setTasksArray, handleClickEdit }) {
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
    const { value } = e.target;
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
      const newTaskData = {
        id: taskInfo.id,
        title: formValue.title,
        timer: `${formValue.timer.min ? formValue.timer.min : '00'}:${formValue.timer.sec ? formValue.timer.sec : '00'}`,
        status: 'active',
        creationTime: new Date(),
      };
      setTasksArray((data) => {
        const oldTask = data.indexOf(taskInfo);
        return [...data.slice(0, oldTask), newTaskData, ...data.slice(oldTask + 1)];
      });
      setFormValue({
        title: '',
        timer: {
          min: '',
          sec: '',
        },
      });
      handleClickEdit();
    }
  }

  function handleFormKeyDown(e) {
    if (e.key === 'Enter') {
      handleFormSubmit(e);
    }
  }

  return (
    <form onBlur={handleClickEdit} className="new-todo-form" onKeyDown={handleFormKeyDown}>
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
    </form>
  );
}

export default TaskEdit;
