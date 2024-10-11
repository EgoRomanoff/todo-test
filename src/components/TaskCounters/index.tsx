import Box from "@mui/material/Box";

import type { Task, TaskGroup } from "@/types";
import { getDeclension } from "@/utils/getDeclension";

const TaskCounters = ({
  taskList,
  activeGroup,
  groupTasks,
}: {
  taskList: Task[];
  activeGroup: TaskGroup | null;
  groupTasks: Task[];
}) => {
  const total = taskList.length;
  const noun = getDeclension(total, ["задача", "задачи", "задач"]);
  const { order, label } = activeGroup || {};

  return (
    <Box
      component="p"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14,
        m: 0,
      }}
    >
      <span>
        Всего {total} {noun}
      </span>

      {!!order && order !== 0 && (
        <span>
          {label}: {groupTasks.length}
        </span>
      )}
    </Box>
  );
};

export default TaskCounters;
