import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/auth/Login";
import NotFound from "@/pages/NotFound";
import AddTaskPage from "@/pages/task/AddTaskPage";
import EditTaskPage from "@/pages/task/EditTaskPage";
import TaskTrackPage from "@/pages/task/TaskTrackPage";
import RegisterForm from "@/pages/auth/Register";
import PrivateRoute from "./privateRoute";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="task/add" element={<AddTaskPage />} />
          <Route path="task/edit/:id" element={<EditTaskPage />} />
          <Route path="task/:id/track" element={<TaskTrackPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
