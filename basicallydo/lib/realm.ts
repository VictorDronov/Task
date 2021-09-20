import * as Realm from "realm-web";

export const realmApp: Realm.App = new Realm.App({
  id: process.env.NEXT_PUBLIC_APP_ID,
});

export const mongodb = realmApp?.currentUser?.mongoClient("mongodb-atlas");
