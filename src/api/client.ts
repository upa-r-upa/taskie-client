import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import {
  Configuration,
  AuthApiFactory,
  TodosApiFactory,
  UsersApiFactory,
  HabitsApiFactory,
  TaskApiFactory,
} from "./generated";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
const apiConfig = new Configuration({
  basePath: API_BASE_URL,
});

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const queryClient = new QueryClient({
  defaultOptions: {},
});

const authApi = AuthApiFactory(apiConfig, API_BASE_URL, client);
const todoApi = TodosApiFactory(apiConfig, API_BASE_URL, client);
const usersApi = UsersApiFactory(apiConfig, API_BASE_URL, client);
const habitsApi = HabitsApiFactory(apiConfig, API_BASE_URL, client);
const taskApi = TaskApiFactory(apiConfig, API_BASE_URL, client);

export { authApi, todoApi, usersApi, habitsApi, taskApi };
