import { ITaskFormData, IUserFormData, Status } from "src/types";

export const TASK_STATE_DATA = [
  { label: "status_task", value: Status.All },
  { label: "todo", value: Status.Todo },
  { label: "doing", value: Status.Doing },
  { label: "done", value: Status.Done },
];

export const STATUS_DATA = [
  { value: "", text: "all" },
  { value: "Todo", text: "todo" },
  { value: "Doing", text: "doing" },
  { value: "Done", text: "done" },
];

export const DEFAULT_USER_FORM_DATA: IUserFormData = {
  email: "",
  password: "",
  username: "",
};

export const DEFAULT_TASK_FORM_DATA: ITaskFormData = {
  title: "",
  startTime: "",
  endTime: "",
  assignee: "",
  progress: "",
  status: Status.All,
};
