import React, {useState} from 'react';

import './App.css';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

function App() {
  const [tasksArray, setTasksArray] = useState([
    {
      id: 1,
      description: 'Completed task',
      status: 'active',
    },
    {
      id: 2,
      description: 'Editing task',
      status: 'active',
    },
    {
      id: 3,
      description: 'Active task',
      status: 'complete',
    }
  ])
  const [ tasksFilter, setTasksFilter ] = useState('all'); 

  return (
    <div className="todoapp">
      <header>
        <h1>todos</h1>
        <NewTaskForm tasksArray={tasksArray} setTasksArray={setTasksArray}>
        </NewTaskForm>
      </header>
      <section className='main'>
        <TaskList selectedFilter={tasksFilter} tasksArray={tasksArray} setTasksArray={setTasksArray}>
        </TaskList>
      </section>
      <Footer tasksFilter={tasksFilter} setTasksFilter={setTasksFilter} tasksArray={tasksArray} setTasksArray={setTasksArray}>
        
      </Footer>
    </div>
  );
}

export default App;
