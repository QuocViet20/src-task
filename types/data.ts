import { Status } from "./enum";

export interface Task {
  id: number | undefined;
  startTime: string;
  endTime: string;
  assignee: string;
  progress: string;
  title: string;
  status: Status;
}

export interface Assignee {
  id: number | undefined;
  name: string;
  value: string;
}

export interface Option {
  label: string;
  value: any;
}

export interface ITaskFormData {
  startTime: string;
  endTime: string;
  assignee: string;
  progress: string;
  title: string;
  status: Status;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserEdit {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
}
export interface UserCreateAccount {
  username: string;
  email: string;
  password: string;
  passwordrepeat: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface IUserFormData {
  username: string;
  email: string;
  password: string;
}

export interface IUserEdit {
  username: string;
  email: string;
}

export interface AuthData {
  role: any;
  username: string;
  email: string;
  accessToken: string;
}
