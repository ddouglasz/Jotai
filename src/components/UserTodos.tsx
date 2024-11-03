import React, { useState } from "react";
import { useAtom } from "jotai";
import { userTodosAtom, todoStatsAtom, resetTodosAtom } from "../atoms";

const UserTodos = () => {
  const [todos, setTodos] = useAtom(userTodosAtom);
  const [stats] = useAtom(todoStatsAtom);
  const [, resetTodos] = useAtom(resetTodosAtom);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index: number) => {
    setTodos((prevTodos: any[]) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h3>User's To-Do List</h3>
      <div>
        <p>Total: {stats.total}</p>
        <p>Completed: {stats.completed}</p>
        <p>Remaining: {stats.remaining}</p>
      </div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new to-do"
      />
      <button onClick={addTodo}>Add To-Do</button>
      <button onClick={resetTodos}>Reset Todos</button>
      <ul style={{ listStyle: "none" }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <span onClick={() => toggleTodo(index)}>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTodos;
