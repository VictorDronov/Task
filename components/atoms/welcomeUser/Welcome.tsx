import React from "react";
import { UserObject } from "pages/api/getUsername";
import { CreateUsername } from "@components/forms";

export default function WelcomeUser({ user }: UserProps): React.ReactElement {
  return user ? (
    <h2 className="pt-3 text-xl font-semibold text-center text-brand-primary tablet:text-2xl">
      Welcome&nbsp;
      {user?.user.user_name}
    </h2>
  ) : (
    <CreateUsername />
  );
}

interface UserProps {
  user: UserObject | undefined;
}
