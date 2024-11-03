import React from "react";
import { useAtom } from "jotai";
import { type Task, taskListAtom, resetTasksAtom  } from "../atoms";
import TaskStats from "./TaskStats";

const TaskList = () => {
  const [, resetTasks] = useAtom(resetTasksAtom);
  const [taskList, setTaskList] = useAtom(taskListAtom);

  const toggleCompletion = (id: number) => {
    setTaskList((prevTasks: Task[]) =>
      prevTasks.map((prevTask) =>
        prevTask.id === id ? { ...prevTask, completed: !prevTask.completed } : prevTask
      )
    );
  };
  
  const addTask = () => {
    setTaskList((oldTasks) => [
      ...oldTasks,
      {
        id: oldTasks.length + 1,
        text: `New Task ${oldTasks.length + 1}`,
        description: `New Task ${oldTasks.length + 1}`,
        completed: false,
      },
    ]);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <TaskStats />
      <button onClick={addTask}>Add Task</button>
      <button onClick={resetTasks}>Reset All Tasks</button>
      <ul style={{listStyle: "none"}}>
        {taskList.map((task) => {
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)}
              />
              {task.description}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
