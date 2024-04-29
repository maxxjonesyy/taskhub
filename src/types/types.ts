import { Key } from "react";

export type User = {
  id: Key;
  email: String;
  token: String;
  username: String;
};

export type Project = {
  createdAt: Date;
  createdBy: String;
  name: String;
  _id: Key;
  tasks: Array<String>;
  updatedAt: Date;
  __v: Number;
};
