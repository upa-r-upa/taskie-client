import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import Root from "./App";
import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RoutinePlayPage from "./pages/RoutinePlayPage";
import RoutinePage from "./pages/RoutinePage";
import TodoPage from "./pages/TodoPage";
import HabitPage from "./pages/HabitPage";
import RoutineEditPage from "./pages/RoutineEditPage";
import RoutineReportPage from "./pages/RoutineReportPage";
import HabitReportPage from "./pages/HabitReportPage";

import Routes from "./constants/routes";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";

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
          path={`${Routes.ROUTINE_PLAY}:routineId`}
          element={<RoutinePlayPage />}
        />
        <Route
          path={`${Routes.ROUTINE_EDIT}:routineId`}
          element={<RoutineEditPage />}
        />
        <Route
          path={`${Routes.ROUTINE_REPORT}:routineId`}
          element={<RoutineReportPage />}
        />

        <Route path={Routes.HABIT} element={<HabitPage />} />
        <Route
          path={`${Routes.HABIT_REPORT}:habitId`}
          element={<HabitReportPage />}
        />

        <Route path={Routes.DASHBOARD} element={<Dashboard />} />
      </Route>
    </Route>
  )
);

export default router;
