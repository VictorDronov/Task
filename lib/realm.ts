import * as Realm from "realm-web";

let appID: string;
if (process.env.NEXT_PUBLIC_APP_ID) {
  appID = process.env.NEXT_PUBLIC_APP_ID;
} else {
  throw new Error("appID environment variable is not set");
}

export const realmApp: Realm.App = new Realm.App({
  id: appID,
});

export const mongodb = realmApp?.currentUser?.mongoClient("mongodb-atlas");
