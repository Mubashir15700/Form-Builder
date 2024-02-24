import { checkAuth } from "../api/auth";
import { setLoading } from "../redux/slices/user";
import { setLoggedIn, setUsername, setRole } from "../redux/slices/user";

const initializeUser = async (role, dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await checkAuth({ role });
        if (response && response.status === 200) {
            dispatch(setLoggedIn(true));
            dispatch(setUsername(response?.userData?.username));
            dispatch(setRole(role));
        } else {
            dispatch(setLoggedIn(false));
        }
    } catch (error) {
        console.error("Authentication check failed:", error);
        dispatch(setLoggedIn(false));
    } finally {
        dispatch(setLoading(false));
    }
};

export default initializeUser;
