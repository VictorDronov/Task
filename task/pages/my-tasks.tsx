import { TaskForm } from "@components/forms";
import { Tasks } from "@components/organisms";
import { Template } from "@components/templates";
import { useState } from "react";

const MyTasks = (): React.ReactElement => {
  const [isRefreshing, setRefreshing] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isVisibile, setIsVisibile] = useState(false);

  return (
    <Template header footer>
      <TaskForm
        setLoading={setLoading}
        isLoading={isLoading}
        isVisibile={isVisibile}
        setIsVisibile={setIsVisibile}
        setRefreshing={setRefreshing}
      />
      <Tasks isRefreshing={isRefreshing} setRefreshing={setRefreshing} />
    </Template>
  );
};

export default MyTasks;
