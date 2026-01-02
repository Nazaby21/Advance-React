import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import DashboardHome from "../Pages/Dashboards/DashboardHome";
import Projects from "../Pages/Dashboards/Projects";
import Skills from "../Pages/Dashboards/Skills";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<Projects />} />
        <Route path="skills" element={<Skills />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
