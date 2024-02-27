import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FormsListDropDown from "./FormsListDropdown";
import { getForms } from "../api/user";

const FormLists = ({ role, userId }) => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllForms = async () => {
            setLoading(true);
            try {
                let response;
                if (role === "admin") {
                    response = await getForms(userId);
                } else {
                    response = await getForms();
                }
                if (response && response.status === 200) {
                    setForms(response.forms);
                } else {
                    toast.error("Failed to fetch forms");
                }
            } catch (error) {
                console.log(error);
                toast.error("An error occured: ", error?.message);
            } finally {
                setLoading(false);
            }
        };

        getAllForms();
    }, []);

    return (
        <ul role="list" className="divide-y mx-4 divide-gray-100">
            {loading ? (
                <div className="grid mt-12 place-items-center">
                    Loading...
                </div>
            ) : (
                forms.length ? (
                    forms.map((form) => (
                        <li key={form._id} className="px-4 flex border rounded mb-3 justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-50">{form.title}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{form.description}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <FormsListDropDown
                                    link={`/forms/${form._id}`}
                                    submissions={`/projects/${form._id}/submissions`}
                                />
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="grid mt-12 place-items-center">
                        No projects found
                    </div>
                )
            )}
        </ul>
    );
};

export default FormLists;
