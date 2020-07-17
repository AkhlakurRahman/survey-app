import { MongoClient } from "./dependencies.ts";

const client = new MongoClient();
client.connectWithUri(
  Deno.env.get('MONGODB_URI')!,
);

// Defining schema interface
interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string;
}

const db = client.database("survey");

export const usersCollection = db.collection("users");
