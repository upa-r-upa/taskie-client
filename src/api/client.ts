import axios from "axios";
import {
  Configuration,
  AuthApiFactory,
  TodosApiFactory,
  UsersApiFactory,
  HabitsApiFactory,
  TaskApiFactory,
} from "./generated";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
const apiConfig = new Configuration({});

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const authApi = AuthApiFactory(apiConfig, "", client);
const todoApi = TodosApiFactory(apiConfig, "", client);
const usersApi = UsersApiFactory(apiConfig, "", client);
const habitsApi = HabitsApiFactory(apiConfig, "", client);
const taskApi = TaskApiFactory(apiConfig, "", client);

export { authApi, todoApi, usersApi, habitsApi, taskApi };
