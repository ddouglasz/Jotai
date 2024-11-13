import {ReactNode} from "react";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type TTodo = {
  text: ReactNode;
  id: number;
  description: string;
  completed: boolean;
  dueDate?: string;
};

type TUserDetails = {
  name: string;
  email: string;
};

type TMockData = Record<number, TUserDetails>;

// Define the atom
export const newTodoAtom = atom("");

export const dateAtom = atom("");

// Basic Atoms
export const userIdAtom = atomWithStorage('selectedUserId', 1); 

// Mock user data
const userData: TMockData = {
  1: { name: "joe", email: "joe@example.com" },
  2: { name: "kate", email: "kate@example.com" },
};

// User profile atom
export const userProfileAtom = atom(async (get) => {
  const userId = get(userIdAtom);
  return userData[userId];
});

// Todos storage
const allTodosAtom = atomWithStorage<Record<number, TTodo[]>>('allTodos', { 1: [], 2: [] });

// User-specific todos atom
export const userTodosAtom = atom(
  (get) => {
    const userId = get(userIdAtom);
    const allTodos = get(allTodosAtom);
    return allTodos[userId] || [];
  },
  (get, set, update) => {
    const userId = get(userIdAtom);
    const allTodos = get(allTodosAtom);
    const userTodos = allTodos[userId] || [];
    const updatedTodos = typeof update === "function" ? update(userTodos) : update;
    
    set(allTodosAtom, {
      ...allTodos,
      [userId]: updatedTodos,
    });
  }
);

export const resetTodosAtom = atom(null, (get, set) => {
  set(userTodosAtom, []);
});

// User-specific todo stats - derived atom
export const todoStatsAtom = atom((get) => {
  const todos = get(userTodosAtom);
  const completed = todos.filter((todo) => todo.completed).length;
  const total = todos.length;
  const remaining = total - completed;
  return { total, completed, remaining };
});


// Fetch todos for the selected user from the API
export const todosAtom = atom(async (get) => {
  const userId = get(userIdAtom);

  // Fetch todos for the selected user from the API
  const response = await fetch(`https://someapi.com/todos?userId=${userId}`);
  const data = await response.json();
  return data || [];
});