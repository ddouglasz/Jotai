import React from "react";
import "./App.css";
import { Provider } from "jotai";
import TaskList from "./components/TaskList";
import UserProfile from "./components/UserProfile";
import TaskStats from "./components/TaskStats";

function App() {
  return (
    <Provider>
      <div className="App">
        <h1>Todo App with Jotai</h1>
        {/* <UserProfile /> */}
        <TaskStats />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
