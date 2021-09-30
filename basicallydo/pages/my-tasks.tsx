import { useEffect, useState } from "react";
import { ContentWrapper, CreateTaskForm, Tasks } from "components";
import { realmApp } from "../lib/realm";
import { useRouter } from "next/router";

const MyTasks = (): React.ReactElement => {
  const router = useRouter();
  const [isRefreshing, setRefreshing] = useState<boolean>(true);

  const isAuthenticated = !!realmApp.currentUser;

  const CheckAuth = (isAuthenticated: boolean) => {
    if (!isAuthenticated) {
      router.push("/auth");
    } else {
      router.push("/my-tasks");
    }
  };

  useEffect(() => {
    CheckAuth(isAuthenticated);
  }, [isAuthenticated]);

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
