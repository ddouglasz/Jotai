import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Task = {
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
export const userIdAtom = atom(1); // Current user ID
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


// Async Atom for user profile (Mock data)
export const userProfileAtom = atom(async (get) => {
  const userId = get(userIdAtom);
  const mockData: TMockData = {
    1: { name: "Alice", email: "alice@example.com" },
    2: { name: "Bob", email: "bob@example.com" },
  };
  return mockData[userId] || {};
});

// Task count derived atom
export const taskStatsAtom = atom((get) => {
  const tasks = get(taskListAtom);
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;
  return { completed, pending };
});

// Reset atom to clear tasks
export const resetTasksAtom = atom(null, (get, set) => set(taskListAtom, []));
