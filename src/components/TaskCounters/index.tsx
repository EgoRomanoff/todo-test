import Paper from "@mui/material/Paper";
import { Task, TaskGroup } from "../../types";

const TaskCounters = ({
  taskList,
  activeGroup,
  groupTasks,
}: {
  taskList: Task[];
  activeGroup: TaskGroup | null;
  groupTasks: Task[];
}) => {
  return (
    <Paper component="p" sx={{
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <span>Всего {taskList.length} задач</span>

      {activeGroup && activeGroup.order !== 0 && (
        <span>
          {activeGroup.label}: {groupTasks.length}
        </span>
      )}
    </Paper>
  );
};

export default TaskCounters;
