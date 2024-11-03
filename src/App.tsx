import React, { Suspense } from "react";
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
        <Suspense fallback={<div>Loading user profile...</div>}>
        <UserProfile />
      </Suspense>
        <TaskStats />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
