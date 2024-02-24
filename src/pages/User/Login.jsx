import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import images from "../../assets/Images";
import loginSchema from "../../validations/loginSchema";
import FormErrorDisplay from "../../components/FormErrorDisplay";
import handleInputChange from "../../utils/formUtils/handleInputChange";
import handleFormErrors from "../../utils/formUtils/handleFormErrors";
import initializeUser from "../../utils/initializeUser";
import { login } from "../../api/auth";

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
            await loginSchema.validate(formData, { abortEarly: false });
            setErrors({});

            const response = await login(formData);

            if (response) {
                setServerResponse(response);
                if (response.status === 200) {
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
                <img
                    className="mx-auto h-10 w-auto"
                    src={images.logo}
                    alt="Your Company"
                />
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
                        <div className="">
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
                        <div className="">
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
                        <div
                            className={`mt-3 ${serverResponse.status === "failed" ?
                                "bg-red-500 text-white" :
                                "bg-green-500 text-white"} px-4 py-2 rounded-md`}
                            role="alert"
                        >
                            {serverResponse.message}
                        </div>
                    )}
                </form>
                {role === "user" && (
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <Link to="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Create account
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
