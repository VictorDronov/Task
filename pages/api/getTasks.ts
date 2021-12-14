import { mongodb } from "lib/realm";

// Gets tasks list
export default async function getTasks(id: string) {
  const data = await mongodb
    ?.db("user_tasks")
    .collection("tasks")
    .find({ user_id: id });
  return data;
}
