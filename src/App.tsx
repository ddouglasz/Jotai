import React from 'react';
import './App.css';
import { Provider } from 'jotai';
import { useAtom } from 'jotai';
import TaskList from './components/TaskList';
import UserProfile from './components/UserProfile';
import TaskStats from './components/TaskStats';
import { taskListAtom } from './atoms';
// import './App.css';

function App() {
  const [, setTaskList] = useAtom(taskListAtom);

  const addTask = () => {
    // @ts-ignore
    setTaskList((oldTasks) => [
      ...oldTasks,
      { id: oldTasks.length + 1, description: `New Task ${oldTasks.length + 1}`, completed: false },
    ]);
  };

  return (
    <Provider>
      <div className="App">
        <h1>Todo App with Jotai</h1>
        <UserProfile />
        <TaskStats />
        <button onClick={addTask}>Add Task</button>
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
