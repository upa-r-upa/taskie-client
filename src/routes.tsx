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
      <Route path={Routes.LOGIN} element={<LoginPage />} />
      <Route path={Routes.SIGN_UP} element={<SignUpPage />} />

      <Route path={Routes.MAIN} element={<RequireAuth />}>
        <Route index element={<MainPage />} />
        <Route path={Routes.TODO} element={<TodoPage />} />

        <Route path={Routes.ROUTINE} element={<RoutinePage />} />
        <Route
          path={`${Routes.ROUTINE_CREATE}`}
          element={<RoutineCreatePage />}
        />
        <Route
          path={`${Routes.ROUTINE_PLAY}:routineId`}
          element={<RoutinePlayPage />}
        />
        <Route
          path={`${Routes.ROUTINE_EDIT}:routineId`}
          element={<RoutineEditPage />}
        />

        <Route path={Routes.HABIT} element={<HabitPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

export default router;
