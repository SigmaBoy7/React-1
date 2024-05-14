import React from 'react';

import './App.css';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

function App() {
  return (
    <div className="todoapp">
      <header>
        <h1>todos</h1>
        <NewTaskForm>
        </NewTaskForm>
      </header>
      <section className='main'>
        <TaskList>
        </TaskList>
      </section>
      <Footer>
        
      </Footer>
    </div>
  );
}

export default App;
