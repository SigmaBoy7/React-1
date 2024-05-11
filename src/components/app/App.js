import React from 'react';

import './App.css';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

function App() {
  const tasksData = [
    {
      id: 1,
      description: 'Completed task',
    },
    {
      id: 2,
      description: 'Editing task',
    },
    {
      id: 3,
      description: 'Active task',
    }
  ]

  return (
    <div className="todoapp">
      <header>
        <h1>todos</h1>
        <NewTaskForm>
        </NewTaskForm>
      </header>
      <section className='main'>
        <TaskList tasksData={tasksData}>
        </TaskList>
      </section>
      <Footer>
        
      </Footer>
    </div>
  );
}

export default App;
