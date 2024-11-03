import React, { Suspense } from "react";
import "./App.css";
import { Provider } from "jotai";
import UserProfile from "./components/UserProfile";
import UserTodos from "./components/UserTodos";

function App() {
  return (
    <Provider>
      <div className="App">
        <h1>Todo App with Jotai</h1>
        <Suspense fallback={<div>Loading user profile...</div>}>
        <UserProfile />
      </Suspense>
        <UserTodos />
      </div>
    </Provider>
  );
}

export default App;
