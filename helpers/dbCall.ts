import { mongodb, realmApp } from "lib/realm";

export const dbCall = (database: string, collection: string) => {
  if (mongodb) return mongodb.db(database).collection(collection);
};

export const dbInsertOne = (
  database: string,
  collection: string,
  data: string
) => {
  if (realmApp.currentUser)
    return dbCall(database, collection)?.insertOne({
      user_id: realmApp.currentUser.id,
      insertData: data,
    });
};

export const dbGetById = (database: string, collection: string) => {
  if (mongodb && realmApp.currentUser)
    return dbCall(database, collection)?.find({
      user_id: realmApp.currentUser.id,
    });
};

export const dbDeleteById = (
  database: string,
  collection: string,
  id: string
) => {
  if (mongodb && realmApp.currentUser)
    return dbCall(database, collection)?.deleteOne({
      _id: id,
    });
};
