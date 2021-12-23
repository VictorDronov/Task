import { dbGetById } from "helpers";

// Gets tasks list
export default async function getTasks() {
  const data = await dbGetById("user_tasks", "tasks");
  return data;
}
