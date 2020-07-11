import { MongoClient } from "./dependencies.ts";

const client = new MongoClient();
client.connectWithUri(
  "mongodb+srv://akrahman:akrahman@cluster0-zbbqc.mongodb.net/survey?retryWrites=true&w=majority",
);

// Defining schema interface
interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string;
}

const db = client.database("survey");

export const usersCollection = db.collection("users");
