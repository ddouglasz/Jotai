import React from 'react';
import { useAtom } from 'jotai';
import { taskListAtom, taskAtomFamily, resetTasksAtom } from '../atoms';

function TaskList() {
    const [tasks] = useAtom(taskListAtom);
    const [, resetTasks] = useAtom(resetTasksAtom);
    
    // @ts-ignore
    const useToggleTaskCompletion = (id) => {
      const [, updateTask] = useAtom(taskAtomFamily(id));
      return () => {
        // @ts-ignore
        updateTask((task) => ({ ...task, completed: !task.completed }));
      };
    };

    const toggleTaskCompletion = useToggleTaskCompletion;

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={resetTasks}>Reset All Tasks</button>
      <ul>
        {tasks.map((task) => (
            // @ts-ignore
          <li key={task.id}>
            
            <input
              type="checkbox"
              // @ts-ignore
              checked={task.completed}
              // @ts-ignore
              onChange={() => toggleTaskCompletion(task.id)}
            />
            {/* @ts-ignore */}
            {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
