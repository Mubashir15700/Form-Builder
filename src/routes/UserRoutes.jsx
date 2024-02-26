import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/User/LandingPage";
import Home from "../pages/User/Home";
import CreateForm from "../pages/User/CreateForm";
import FormSubmissions from "../pages/User/FormSubmissions";
const Login = lazy(() => import("../pages/User/Login"));
const Signup = lazy(() => import("../pages/User/Signup"));
import Error404 from "../pages/Error404";

const UserRoutes = ({ isLoggedIn }) => {

    const navigateToLogin = () => <Navigate to="/login" />;
    const navigateToHome = () => <Navigate to="/home" />;

    const routes = [
        { path: "/", element: !isLoggedIn ? <LandingPage /> : navigateToHome() },
    ];

    const protectedRoutes = [
        { path: "/home", element: isLoggedIn ? <Home /> : navigateToLogin() },
        { path: "/new-project", element: isLoggedIn ? <CreateForm /> : navigateToLogin() },
        { path: "/projects/:id/submissions", element: isLoggedIn ? <FormSubmissions /> : navigateToLogin() },
    ];

    const authRoutes = [
        { path: "/login", element: !isLoggedIn ? <Login role={"user"} /> : navigateToHome() },
        { path: "/sign-up", element: !isLoggedIn ? <Signup /> : navigateToHome() },
    ];

    return (
        <Routes>
            {routes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {protectedRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {authRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {/* Error Page */}
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};

export default UserRoutes;
