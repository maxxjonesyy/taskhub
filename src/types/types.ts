import { Key } from "react";

export type User = {
  id: Key;
  email: string;
  token: string;
  username: string;
};

export type Project = {
  createdAt: Date;
  createdBy: string;
  name: string;
  _id: Key;
  tasks: Array<string>;
  updatedAt: Date;
  __v: Number;
};

export type Task = {
  name: string;
  priority: string;
  status: string;
  dueDate: Date | undefined;
  description: string | undefined;
  _id: Key | undefined;
};

export type ActiveProjectType = Project | undefined;
