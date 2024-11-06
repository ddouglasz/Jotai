import React, { useState } from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { PlusBoldIcon } from "@commercetools-uikit/icons";
import PrimaryButton from "@commercetools-uikit/primary-button";
import Spacings from "@commercetools-uikit/spacings";
import TextInput from "@commercetools-uikit/text-input";
import { userTodosAtom, resetTodosAtom } from "../atoms/atoms";

const UserTodosContainer = styled.div`
  top: 25%;
  background-color: #ffffff;
  position: absolute;
  left: 40%;
`;

const StyledListContainer = styled.ul`
  list-style: none;
  padding: 0;
  height: 400px;
  // overflow-y: scroll;
`;

const UserTodos = () => {
  const [todos, setTodos] = useAtom(userTodosAtom);
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
    <UserTodosContainer>
      <Spacings.Inline scale="m">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <TextInput
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new to-do"
          />
        </form>
        <PrimaryButton
          iconLeft={<PlusBoldIcon />}
          label="Add todo"
          onClick={addTodo}
        />
        <PrimaryButton
          tone="critical"
          onClick={resetTodos}
          label="Clear todos"
        />
      </Spacings.Inline>
      <StyledListContainer>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              padding: "5px 0",
              cursor: "pointer",
            }}
          >
            <input
              style={{ marginRight: "10px" }}
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <span onClick={() => toggleTodo(index)}>{todo.text}</span>
          </li>
        ))}
      </StyledListContainer>
    </UserTodosContainer>
  );
};

export default UserTodos;
