import {ReactNode} from "react";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Task = {
  text: ReactNode;
  id: number;
  description: string;
  completed: boolean;
};

type TUserDetails = {
  name: string;
  email: string;
};

type TMockData = Record<number, TUserDetails>;

// Basic Atoms
export const userIdAtom = atomWithStorage('selectedUserId', 1); // Current user ID
export const taskListAtom = atomWithStorage<Task[]>("taskList", []); // Task list with local storage persistence

const taskAtoms = new Map();

// Atom Family for tasks
export const taskAtomFamily = (id: number) => {
  if (!taskAtoms.has(id)) {
    // Create and cache an atom for the task if it doesn't exist yet
    const taskAtom = atom(
      (get) => get(taskListAtom).find((task) => task.id === id),
      (get, set, update) => {
        // Update taskListAtom by mapping over tasks to find the modified one
        set(taskListAtom, (prevTasks) =>
          prevTasks.map((task) => (task.id === id ? { ...task, ...(typeof update === 'object' ? update : {}) } : task))
        );
      }
    );
    taskAtoms.set(id, taskAtom);
  }
  return taskAtoms.get(id);
};

// Derived Atom for filtered tasks
export const completedTasksAtom = atom((get) =>
  get(taskListAtom).filter((task) => task.completed)
);

// Mock user data
const mockUserData: TMockData = {
  1: { name: "joe", email: "joe@example.com" },
  2: { name: "kate", email: "kate@example.com" },
};

// User profile atom
export const userProfileAtom = atom(async (get) => {
  const userId = get(userIdAtom);
  return mockUserData[userId];
});

// Todos storage
const allTodosAtom = atomWithStorage<Record<number, Task[]>>('allTodos', { 1: [], 2: [] });

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

// User-specific todo stats
export const todoStatsAtom = atom((get) => {
  const todos = get(userTodosAtom);
  const completed = todos.filter((todo) => todo.completed).length;
  const total = todos.length;
  const remaining = total - completed;
  return { total, completed, remaining };
});

// Reset atom to clear tasks
export const resetTasksAtom = atom(null, (get, set) => set(taskListAtom, []));
