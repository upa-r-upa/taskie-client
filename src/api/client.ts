import axios from "axios";
import {
  Configuration,
  AuthApi,
  TodosApi,
  UsersApi,
  HabitsApi,
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

const authApi = new AuthApi(apiConfig, "", client);
const todoApi = new TodosApi(apiConfig, "", client);
const usersApi = new UsersApi(apiConfig, "", client);
const habitsApi = new HabitsApi(apiConfig, "", client);

export { authApi, todoApi, usersApi, habitsApi };
