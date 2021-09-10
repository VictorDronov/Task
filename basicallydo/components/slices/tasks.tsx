import React, { useEffect, useState } from "react";
import axios from "axios";

interface Tasks {
  data: [{ _id: string; title: string; description: string }];
}

const Tasks = (): React.ReactElement => {
  const [tasks, setTasks] = useState<Tasks>();

  const GetTasks = async (): Promise<void> => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    GetTasks();
  }, []);

  return (
    <div className="container task-wrapper">
      {tasks &&
        tasks.data?.map(({ _id, description, title }) => (
          <div key={_id} className="mx-3 mb-3 md:w-2/6">
            <h3>{title}</h3>
            <p className="text-left">{description}</p>
          </div>
        ))}
    </div>
  );
};

export default Tasks;
