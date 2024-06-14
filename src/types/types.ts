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
  date: Date | undefined;
  description: string | undefined;
  _id: Key | undefined;
};

export type DisplayedProject = Project | undefined;
