import CustomPaper from "../ui/CustomPaper";
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
    <CustomPaper
      component="p"
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>Всего {taskList.length} задач</span>

      {activeGroup && activeGroup.order !== 0 && (
        <span>
          {activeGroup.label}: {groupTasks.length}
        </span>
      )}
    </CustomPaper>
  );
};

export default TaskCounters;
