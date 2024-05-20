import React, {useState} from 'react';

import './NewTaskForm.css';

function NewTaskForm({tasksArray, setTasksArray}) {

  const [formValue, setFormValue] = useState('')

  function handleFormInput(e){
    setFormValue((value) => {
      return e.target.value
    })
  }

  function handleFormSubmit(){

    if (formValue.trim().length !== 0){
    const newTaskData = {
        id: tasksArray[tasksArray.length - 1].id + 1,
        description: formValue,
        status: 'active',
      }
      setTasksArray((data) => {
        return [
          ...data,
          newTaskData
        ]
      })
    }
  }

  function handleFormKeyDown(e){
    if (e.key === 'Enter'){
      handleFormSubmit()
      setFormValue((value) => '')
    }
  }

  return (
    <input className="new-todo"
    placeholder='What needs to be done?' 
    autoFocus 
    value={formValue}
    onChange={handleFormInput}
    onKeyDown={handleFormKeyDown}
    />
  );
}

export default NewTaskForm;
