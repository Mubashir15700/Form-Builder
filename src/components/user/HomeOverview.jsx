import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeOverview = ({ setActiveTab }) => {
    const formsCreated = useSelector((state) => state.user.formsCreated);

    return (
        <div className="border border-white mx-4 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 rounded-lg shadow-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    {formsCreated === 0 ? "No forms created yet" : `${formsCreated} forms created`}
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex flex-col gap-6 items-center">
                    {formsCreated > 0 && (
                        <button
                            onClick={() => setActiveTab("Projects")}
                            className="rounded-md bg-indigo-600 text-white py-2 px-6 text-sm font-semibold shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
                        >
                            View All Forms
                        </button>
                    )}
                    <Link
                        to="/new-project"
                        className="rounded-md border border-indigo-600 text-indigo-600 py-2 px-6 text-sm font-semibold shadow-md hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
                    >
                        New Form
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeOverview;
