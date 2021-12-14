import { WelcomeUser } from "@components/atoms";
import { TaskForm } from "@components/forms";
import { Tasks } from "@components/organisms";
import { Template } from "@components/templates";
import { user } from "lib/realm";
import { useEffect, useState } from "react";
import getUsername, { UserObject } from "./api/getUsername";

const MyTasks = (): React.ReactElement => {
  const [isRefreshing, setRefreshing] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isVisibile, setIsVisibile] = useState(false);
  const [userObj, setUser] = useState<UserObject>();

  useEffect(() => {
    if (user) getUsername(user.id).then((res) => setUser(res));
  }, []);

  return (
    <Template header footer>
      <WelcomeUser user={userObj} />
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
