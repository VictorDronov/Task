import { dbGetById } from "helpers";

// Gets user // TODO: CHANGE THIS
export default async function getUsername(): Promise<UserObject> {
  const data = await dbGetById("users", "usernames");

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
