import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Basic Atoms
export const userIdAtom = atom(1); // Current user ID
type Task = {
  id: number;
  description: string;
  completed: boolean;
};

export const taskListAtom = atomWithStorage<Task[]>("taskList", []); // Task list with local storage persistence

// Atom Family for individual tasks
export const taskAtomFamily = (id: number) =>
  atom(
    (get) => get(taskListAtom).find((task) => task.id === id),
    (get, set, update) => {
      const tasks = get(taskListAtom);
      set(
        taskListAtom,
        tasks.map((task) => (task.id === id ? { ...task, ...(typeof update === 'object' ? update : {}) } : task))
      );
    }
  );

// Derived Atom for filtered tasks
export const completedTasksAtom = atom((get) =>
  // @ts-ignore
  get(taskListAtom).filter((task) => task.completed)
);

type TUserDetails = {
  name: string;
  email: string;
};
type TMockData = Record<number, TUserDetails>;

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
  // @ts-ignore
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;
  return { completed, pending };
});

// Reset atom to clear tasks
export const resetTasksAtom = atom(null, (get, set) => set(taskListAtom, []));
