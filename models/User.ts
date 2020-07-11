import { usersCollection } from "./../mongodb.ts";

class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor({ id = "", name = "", email = "", password = "" }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static findOne(params: object) {
    return usersCollection.findOne(params);
  }

  async createUser() {
    delete this.id;
    const { $oid } = await usersCollection.insertOne(this);
    this.id = $oid;
    return this;
  }
}

export default User;
