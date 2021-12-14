import React from "react";
import { UserObject } from "pages/api/getUsername";

export default function WelcomeUser({ user }: UserProps): React.ReactElement {
  return (
    <h2 className="pt-3 text-xl font-semibold text-center text-brand-primary tablet:text-2xl">
      Welcome&nbsp;
      {user?.user ? user?.user.user_name : "Task Tackler"}
    </h2>
  );
}

interface UserProps {
  user: UserObject | undefined;
}
