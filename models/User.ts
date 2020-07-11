import { usersCollection } from "./../mongodb.ts";

class User {
  static findOne(params: object) {
    return usersCollection.findOne(params);
  }
}

export default User;
