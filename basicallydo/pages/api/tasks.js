import clientPromise from "../../lib/mongodb";

export default async function Get(req, res) {
  const client = await clientPromise;

  const db = await client.db();
  const { method } = req;

  if (method === "GET") {
    try {
      const tasks = await db.collection("tasks").find({}).toArray();

      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      res.status(400).json({ message: "Failed to find any tasks." });
    }
  } else if (req.method === "POST") {
    try {
      const task = await db.collection("tasks").insert(req.body);

      res.status(201).json({ success: true, data: task.ops });
    } catch (error) {
      res.status(400).json({
        message: `"Failed to create any task.", ${error.message}`,
      });
    }
  }
}
