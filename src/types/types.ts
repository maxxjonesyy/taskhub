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

export type TaskObject = {
  name: string;
  priority: string;
  status: string;
  date: Date | null;
  description: string;
};

export type DisplayedProject = Project | undefined;
