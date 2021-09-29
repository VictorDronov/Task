import { useEffect, useState } from "react";
import { ContentWrapper, CreateTaskForm, Tasks } from "components";
import { realmApp } from "../lib/realm";
import router from "next/router";

const MyTasks = (): React.ReactElement => {
  const [isRefreshing, setRefreshing] = useState<boolean>(true);

  const isAuthenticated = !!realmApp.currentUser;
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    } else {
      return;
    }
  });

  return (
    <ContentWrapper>
      <CreateTaskForm setRefreshing={setRefreshing} />
      <Tasks
        isRefreshing={isRefreshing}
        setRefreshing={setRefreshing}
        plant={"/images/plant.svg"}
      />
    </ContentWrapper>
  );
};

export default MyTasks;
