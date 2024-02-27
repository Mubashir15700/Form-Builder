import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
const UserFormsLists = lazy(() => import("../pages/Admin/UserFormsLists"));
const Login = lazy(() => import("../pages/Admin/Login"));
import Error404 from "../pages/Error404";

const AdminRoutes = ({ isLoggedIn }) => {
    const navigateToLogin = () => <Navigate to="/admin/login" />;
    const navigateDashboard = () => <Navigate to="/admin" />;

    const routes = [
        { path: "/", element: isLoggedIn ? <Dashboard /> : navigateToLogin() },
        { path: "/users/:userId/forms", element: isLoggedIn ? <UserFormsLists /> : navigateToLogin() },
        // Auth Route
        { path: "/login", element: !isLoggedIn ? <Login role={"admin"} /> : navigateDashboard() },
        // Error Page
        { path: "/*", element: <Error404 /> },
    ];

    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    );
};

export default AdminRoutes;
