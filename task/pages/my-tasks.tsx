import { useEffect, useState } from "react";
import { ContentWrapper, Tasks, RenderCreateTaskForm } from "components";
import { realmApp } from "../lib/realm";
import { useRouter } from "next/router";

const MyTasks = (): React.ReactElement => {
  const router = useRouter();
  const [isRefreshing, setRefreshing] = useState<boolean>(true);
  const [isVisibile, setIsVisibile] = useState(false);

  const isAuthenticated = !!realmApp.currentUser;

  const CheckAuth = (isAuthenticated: boolean) => {
    if (!isAuthenticated) {
      router.push("/auth");
    } else {
      router.push("/my-tasks");
    }
  };

  const closeModal = () => {
    setIsVisibile(false);
  };

  useEffect(() => {
    CheckAuth(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <ContentWrapper header footer>
      <RenderCreateTaskForm
        isVisibile={isVisibile}
        setIsVisibile={setIsVisibile}
        setRefreshing={setRefreshing}
        closeModal={closeModal}
      />
      <Tasks
        isRefreshing={isRefreshing}
        setRefreshing={setRefreshing}
        plant={"/images/plant.svg"}
      />
    </ContentWrapper>
  );
};

export default MyTasks;
