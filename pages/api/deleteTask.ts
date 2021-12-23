import { dbDeleteById } from "helpers";

export default async function deleteTaskById(id: string) {
  const data = await dbDeleteById("user_tasks", "tasks", id);
  return data;
}
