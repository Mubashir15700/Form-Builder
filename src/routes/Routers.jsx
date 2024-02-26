import { useState, useEffect, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorBoundary from "../components/ErrorBoundary";
import initializeUser from "../utils/initializeUser";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import FormRoutes from "./FormRoute";

const Routers = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const isLoading = useSelector(state => state.user.loading);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            const role = location.pathname.startsWith("/admin") ? "admin" : "user";
            if (!isLoggedIn) {
                await initializeUser(role, dispatch);
            }
            setIsInitialized(true);
        };

        initialize();
    }, [isLoggedIn]);

    if (isLoading || !isInitialized) {
        return <LoadingSpinner />;
    }

    return (
        <ErrorBoundary>
            <Toaster position="top-center" reverseOrder={false} />
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route
                        path="/admin/*"
                        element={<AdminRoutes isLoggedIn={isLoggedIn} />}
                    />
                    <Route
                        path="/forms/*"
                        element={<FormRoutes />}
                    />
                    <Route
                        path="/*"
                        element={<UserRoutes isLoggedIn={isLoggedIn} />}
                    />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};

export default Routers;
