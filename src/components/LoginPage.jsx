import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import handleInputChange from "../utils/formUtils/handleInputChange";
import handleFormErrors from "../utils/formUtils/handleFormErrors";
import initializeUser from "../utils/initializeUser";
import Logo from "./Logo";
import loginValidationSchema from "../utils/validations/loginSchema";
import FormErrorDisplay from "./FormErrorDisplay";
import ServerResponseDisplay from "./ServerResponseDisplay";
import { setLoggedIn } from "../redux/slices/user";
import { login } from "../api/auth";

const Login = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState("");

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        handleInputChange(e, formData, setFormData, setServerResponse, setErrors);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Validate formData against the signup schema
            await loginValidationSchema.validate(formData, { abortEarly: false });

            setErrors({}); // Clear previous validation errors

            const response = await login(formData);

            if (response) {
                setServerResponse(response);
                if (response.status === 200) {
                    dispatch(setLoggedIn(true));
                    if (role === "admin") {
                        initializeUser("admin", dispatch);
                        navigate("/admin");
                    } else {
                        initializeUser("user", dispatch);
                        navigate("/home");
                    }
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error) {
            handleFormErrors(error, setErrors, setServerResponse);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-10 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Logo />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-#d6d3d1">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-#d6d3d1">
                            Username
                        </label>
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1 text-d6d3d1 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={handleChange}
                            />
                        </div>
                        <FormErrorDisplay error={errors.username} />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-#d6d3d1">
                                Password
                            </label>
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1 text-d6d3d1 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={handleChange}
                            />
                        </div>
                        <FormErrorDisplay error={errors.password} />
                        {/* Show/Hide Password Button */}
                        <button
                            type="button"
                            className="ml-1"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? (
                                <IoMdEyeOff />
                            ) : (
                                <IoEye />
                            )}
                        </button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleLogin}
                        >
                            Sign in
                        </button>
                    </div>
                    {serverResponse && (
                        <ServerResponseDisplay serverResponse={serverResponse} />
                    )}
                </form>
                {role === "user" && (
                    <>
                        <div className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{" "}
                            <Link to="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Create account
                            </Link>
                            <div>

                                <Link to="/admin/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Login as admin
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
