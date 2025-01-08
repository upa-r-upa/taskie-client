import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import Routes from "@/constants/routes";
import RequireAuth from "@/components/RequireAuth";
import {
  ErrorPage,
  LoginPage,
  SignUpPage,
  MainPage,
  TodoPage,
  RoutinePage,
  RoutineCreatePage,
  RoutinePlayPage,
  RoutineEditPage,
  HabitPage,
  NotFoundPage,
} from "@/pages";

import Root from "./App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<Root />} errorElement={<ErrorPage />}>
      <Route path={Routes.Login} element={<LoginPage />} />
      <Route path={Routes.SignUp} element={<SignUpPage />} />

      <Route path={Routes.Main} element={<RequireAuth />}>
        <Route index element={<MainPage />} />
        <Route path={Routes.Todo} element={<TodoPage />} />

        <Route path={Routes.Routine} element={<RoutinePage />} />
        <Route
          path={`${Routes.RoutineCreate}`}
          element={<RoutineCreatePage />}
        />
        <Route
          path={`${Routes.RoutinePlay}:routineId`}
          element={<RoutinePlayPage />}
        />
        <Route
          path={`${Routes.RoutineEdit}:routineId`}
          element={<RoutineEditPage />}
        />

        <Route path={Routes.Habit} element={<HabitPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

export default router;
