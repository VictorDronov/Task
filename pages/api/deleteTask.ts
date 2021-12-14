import { mongodb } from "lib/realm";

export default async function deleteTaskById(id: string) {
  const data = await mongodb
    ?.db("user_tasks")
    .collection("tasks")
    .deleteOne({ _id: id });

  return data;
}
