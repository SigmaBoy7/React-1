import React from 'react';

import './NewTaskForm.css';

function NewTaskForm() {
  return (
    <input className="new-todo" placeholder='What needs to be done?' autoFocus/>
  );
}

export default NewTaskForm;
