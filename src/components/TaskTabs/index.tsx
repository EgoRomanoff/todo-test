import { SyntheticEvent, useState } from "react";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { TAB_ARIA_PREFIX, TABPANEL_ARIA_PREFIX, TASK_GROUPS } from "../../constants";
import { TaskGroup } from "../../types";

const a11yTabProps = (key: number) => {
  return {
    id: `${TAB_ARIA_PREFIX}-${key}`,
    "aria-controls": `${TABPANEL_ARIA_PREFIX}-${key}`,
  };
};

const TaskTabs = ({
  initialTab = 0,
  taskGroups = TASK_GROUPS,
  onTabChange,
}: {
  initialTab?: number;
  taskGroups?: TaskGroup[];
  onTabChange?: (index: number) => void;
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (_: SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  return (
    <Paper
      component={Tabs}
      value={activeTab}
      onChange={handleTabChange}
      aria-label="Списки задач"
    >
      {taskGroups.map(({ label, order }) => (
        <Tab
          key={`task-tab-${order}`}
          label={label}
          {...a11yTabProps(order)}
        />
      ))}
    </Paper>
  );
};

export default TaskTabs;
