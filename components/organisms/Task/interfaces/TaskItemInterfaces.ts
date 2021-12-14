import { Dispatch, SetStateAction } from "react";

export interface TaskStateProps {
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  isRefreshing: boolean;
}

export interface ITaskProps extends TaskStateProps {
  tasks?: TaskProps[];
  deleteTask: (id: string) => void;
}

export interface TaskProps extends ITaskProps {
  user_id: string;
  _id: string;
  task: string;
}
