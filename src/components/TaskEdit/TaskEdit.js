import { React, useState, useRef, useEffect } from 'react';

function TaskEdit({ taskInfo, setTasksArray, handleClickEdit, setIsTaskChanged }) {
  const formRef = useRef(null);

  const [formValue, setFormValue] = useState({
    title: taskInfo.title,
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
        id: taskInfo.id,
        title: formValue.title,
        timer: `${min ? min : '00'}:${sec ? sec : '00'}`,
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
      setIsTaskChanged(() => true);
      handleClickEdit();
    }
  }

  function handleFormKeyDown(e) {
    if (e.key === 'Enter') {
      handleFormSubmit(e);
    }
  }

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      handleClickEdit();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <form ref={formRef} className="new-todo-form" onKeyDown={handleFormKeyDown}>
      <input className="new-todo" placeholder="Task" value={formValue.title} onChange={handleTitleInput} />
      {taskInfo.timer !== '00:00' ? (
        <>
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
        </>
      ) : null}
    </form>
  );
}

export default TaskEdit;
