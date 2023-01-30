import axios from "axios";
import {
  ITaskFormData,
  IUserFormData,
  Task,
  User,
  UserCreate,
  UserLogin,
} from "src/types";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
  },
});

export const getTasks = (
  params:
    | {
        currentPage: number;
        limit: number;
        debouncedSearchHook: string;
        selectedStatus: string;
      }
    | {
        currentPage: number;
        limit: number;
        debouncedSearchHook: string;
        selectedStatus?: undefined;
      },
) => {
  return apiClient.get<Task>(`/tasks`, {
    params: {
      _page: params.currentPage,
      _limit: params.limit,
      q: params.debouncedSearchHook,
      status: params.selectedStatus,
    },
  });
};

export const getUser = (
  params:
    | {
        currentPage: number;
        limit: number;
        debouncedSearchHook: string;
      }
    | {
        currentPage: number;
        limit: number;
        debouncedSearchHook: string;
      },
) => {
  return apiClient.get<User>(`/users`, {
    params: {
      _page: params.currentPage,
      _limit: params.limit,
      q: params.debouncedSearchHook,
    },
  });
};

export const addtask = (task: ITaskFormData) =>
  apiClient.post<Task>("/tasks", task);

export const getAssignee = () => apiClient.get(`/users`);

export const getTask = (taskId: string) =>
  apiClient.get<Task>(`tasks/${taskId}`);

export const updateTask = (taskId: string, task: Task) =>
  apiClient.put<Task>(`tasks/${taskId}`, task);

export const getUserId = (userId: string) =>
  apiClient.get<User>(`users/${userId}`);

export const updateUser = (userId: string, user: IUserFormData) =>
  apiClient.put<User>(`users/${userId}`, user);

export const deleteTask = (id: number) => apiClient.delete<Task>(`tasks/${id}`);

export const deleteUser = (id: number) => apiClient.delete(`users/${id}`);

export const createUser = (user: UserCreate) =>
  apiClient.post("/register", user);

export const userLogin = (user: UserLogin) => apiClient.post("/login", user);
