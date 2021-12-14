import { mongodb } from "lib/realm";

// Gets user
export default async function getUsername(id: string): Promise<UserObject> {
  const data = await mongodb
    ?.db("users")
    .collection("usernames")
    .find({ user_id: id });

  return { user: data && data[0] };
}

export interface UserObject {
  user: User;
}

interface User {
  _id: any;
  user_id: string;
  user_name: string;
}
