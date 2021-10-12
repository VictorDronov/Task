import { useState } from "react";
import { ContentWrapper, Tasks, RenderCreateTaskForm } from "components";

const MyTasks = (): React.ReactElement => {
  const [isRefreshing, setRefreshing] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isVisibile, setIsVisibile] = useState(false);


  return (
    <ContentWrapper header footer>
      <div>
        <RenderCreateTaskForm
          setLoading={setLoading}
          isLoading={isLoading}
          isVisibile={isVisibile}
          setIsVisibile={setIsVisibile}
          setRefreshing={setRefreshing}
        />
        <Tasks isRefreshing={isRefreshing} setRefreshing={setRefreshing} />
      </div>
    </ContentWrapper>
  );
};

export default MyTasks;
