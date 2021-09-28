import type { NextPage } from "next";
import { useState } from "react";
import { ContentWrapper, CreateTaskForm, Tasks } from "components";

const Home: NextPage = () => {
  const [isRefreshing, setRefreshing] = useState<boolean>(true);

  return (
    <>
      <ContentWrapper>
        <CreateTaskForm setRefreshing={setRefreshing} />
        <Tasks
          isRefreshing={isRefreshing}
          setRefreshing={setRefreshing}
          plant={"/images/plant.svg"}
        />
      </ContentWrapper>
    </>
  );
};

export default Home;
