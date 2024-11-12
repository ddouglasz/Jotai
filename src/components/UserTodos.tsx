import React from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { PlusBoldIcon } from "@commercetools-uikit/icons";
import PrimaryButton from "@commercetools-uikit/primary-button";
import Spacings from "@commercetools-uikit/spacings";
import TextInput from "@commercetools-uikit/text-input";
import DateInput from "@commercetools-uikit/date-input";
import {
  userTodosAtom,
  resetTodosAtom,
  newTodoAtom,
  dateAtom,
} from "../atoms/atoms";

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
`;

type TCustomEvent = {
  target: {
    id?: string;
    name?: string;
    value?: string;
  };
};

const UserTodos = () => {
  const [todos, setTodos] = useAtom(userTodosAtom);
  const [, resetTodos] = useAtom(resetTodosAtom);
  const [newTodo, setNewTodo] = useAtom(newTodoAtom);
  const [dueDate, setDueDate] = useAtom(dateAtom);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        text: newTodo,
        id: Date.now(),
        description: "",
        completed: false,
        dueDate,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      setDueDate("");
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
      <Spacings.Stack scale="l">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <Spacings.Inline scale="m">
            <TextInput
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new to-do"
            />
            <DateInput
              value={dueDate}
              onChange={(e: TCustomEvent) =>
                setDueDate(e.target.value as string)
              }
              placeholder="Due date"
            />
          </Spacings.Inline>
        </form>
        <Spacings.Inline scale="m">
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
      </Spacings.Stack>
      <StyledListContainer>
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            style={{
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
            <span
              onClick={() => toggleTodo(index)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            {todo.dueDate && (
              <span
                style={{ marginLeft: "5px", fontSize: "0.7em", color: "gray" }}
              >
                (Due: {todo.dueDate})
              </span>
            )}
          </li>
        ))}
      </StyledListContainer>
    </UserTodosContainer>
  );
};

export default UserTodos;
