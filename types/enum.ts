export enum RoutePath {
  Home = "/",
  Login = "/login",
  Register = "/register",
  TaskList = "/tasks",
  UserList = "/users",
  CreateTask = "/tasks/create",
  CreateUser = "/users/create",
  EditTask = "/tasks/:taskId/edit",
  EditUser = "/users/:userId/edit",
}

export enum Status {
  All = "",
  Todo = "Todo",
  Done = "Done",
  Doing = "Doing",
}
