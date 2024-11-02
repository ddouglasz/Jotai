import React from 'react';
import { useAtom } from 'jotai';
import { taskAtomFamily, taskListAtom, type Task } from '../atoms';

function TaskItem({ id }: Task) {
    // console.log({id});
  // Use the task atom directly here
  const [task, updateTask] = useAtom<Task>(taskAtomFamily(id));

  const [, setTaskList] = useAtom(taskListAtom);

  const toggleCompletion = () => {
    // Update taskListAtom directly with the modified task completion state
    setTaskList((prevTasks: Task[]) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  return (
    <li>
      {task && (
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompletion}
        />
      )}
      {task?.description}
    </li>
  );
}

export default TaskItem;
