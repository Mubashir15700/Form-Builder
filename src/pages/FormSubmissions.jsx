import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getSubmissions } from "../api/admin";
import { getuserFormSubmissions } from "../api/user";
import { getForm } from "../api/form";

export default function FormSubmissions() {

    const role = useSelector((state) => state.user.role);

    const { id } = useParams();

    const [form, setForm] = useState({});
    const [formElements, setFormElements] = useState({});
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formElementIds, setFormElementIds] = useState([]);

    useEffect(() => {
        if (formElements.length) {
            // Extract _id values from formElements and set them to formElementIds
            const ids = [];
            formElements.forEach(element => {
                ids.push(element._id);
            });
            setFormElementIds(ids);
        }
    }, [formElements]);


    useEffect(() => {
        const getFormStructure = async () => {
            try {
                const response = await getForm(id);
                if (response && response.status === 200) {
                    setForm(response.formData.form);
                    setFormElements(response.formData.form.formElements);
                } else {
                    toast.error("Failed to fetch form");
                }
            } catch (error) {
                toast.error(`An error occurred: ${error.message}`);
            }
        };

        const getAllSubmissions = async () => {
            setLoading(true);
            try {
                let response;
                if (role === "admin") {
                    response = await getSubmissions(id);
                } else {
                    response = await getuserFormSubmissions(id);
                }
                if (response && response.status === 200) {
                    setSubmissions(response.submissions);
                } else {
                    toast.error("Failed to fetch submissions");
                }
            } catch (error) {
                toast.error("An error occured: ", error?.message);
            } finally {
                setLoading(false);
            }
        };

        getFormStructure();
        getAllSubmissions();
    }, []);

    return (
        <ul role="list" className="pt-12 px-5 divide-y mx-4 divide-gray-100">
            {loading ? (
                <div className="grid mt-12 place-items-center">
                    Loading...
                </div>
            ) : (
                submissions.length ? (
                    <div className="overflow-x-auto border rounded">
                        <div className="bg-dark">
                            <h2 className="text-center">{form.title}</h2>
                            <p className="text-center text-gray-600">{form.description}</p>
                        </div>
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    {formElements && Array.isArray(formElements) && formElements.map((element, index) => (
                                        <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {element.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {submissions?.map((submission, index) => (
                                    <tr key={index} className="text-black">
                                        {formElementIds.map((element, index) => (
                                            <td
                                                key={index}
                                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                            >
                                                {submission.formData && submission.formData[formElementIds[index]]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                ) : (
                    <div className="grid mt-12 place-items-center">
                        No submissions found
                    </div>
                )
            )}
        </ul>
    );
};
