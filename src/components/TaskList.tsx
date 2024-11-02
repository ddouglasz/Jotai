import React from "react";
import { useAtom } from "jotai";
import { taskListAtom, resetTasksAtom } from "../atoms";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks] = useAtom(taskListAtom);
  const [, resetTasks] = useAtom(resetTasksAtom);

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={resetTasks}>Reset All Tasks</button>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            description={task.description}
            completed={task.completed}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
