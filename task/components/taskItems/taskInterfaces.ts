import { Dispatch, SetStateAction } from "react";

export interface Task {
  user_id: string;
  _id: string;
  title: string;
  description: string;
  complete: boolean;
}

export interface ITasksProps {
  isRefreshing: boolean;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  complete?: number;
}

export interface TaskItem extends ITasksProps {
  tasksComplete?: boolean;
  tasks: Task[] | undefined;
}
