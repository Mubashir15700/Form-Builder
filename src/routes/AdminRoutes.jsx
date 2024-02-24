import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
const UserForms = lazy(() => import("../pages/Admin/UserForms"));
const FormSubmissions = lazy(() => import("../pages/Admin/FormSubmissions"));
const Login = lazy(() => import("../pages/User/Login"));
import Error404 from "../pages/Error404";

const AdminRoutes = ({ isLoggedIn }) => {
    const navigateToLogin = () => <Navigate to="/admin/login" />;
    const navigateDashboard = () => <Navigate to="/admin" />;

    const routes = [
        { path: "/", element: isLoggedIn ? <Dashboard /> : navigateToLogin() },
        { path: "/users/:userId/forms", element: isLoggedIn ? <UserForms /> : navigateToLogin() },
        { path: "/users/:userId/forms/:formId", element: isLoggedIn ? <FormSubmissions /> : navigateToLogin() },
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
