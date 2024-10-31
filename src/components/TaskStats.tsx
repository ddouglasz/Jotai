import React from 'react';
import { useAtom } from 'jotai';
import { taskStatsAtom } from '../atoms';

function TaskStats() {
  const [stats] = useAtom(taskStatsAtom);

  return (
    <div>
      <h2>Task Stats</h2>
      <p>Completed Tasks: {stats.completed}</p>
      <p>Pending Tasks: {stats.pending}</p>
    </div>
  );
}

export default TaskStats;
