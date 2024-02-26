import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import handleFormErrors from "../utils/formUtils/handleFormErrors";
import FormErrorDisplay from "../components/FormErrorDisplay";
import ServerResponseDisplay from "../components/ServerResponseDisplay";
import { getForm, submitForm } from "../api/form";

const Form = () => {
    // Get the id parameter from the URL
    const { id } = useParams();

    const [form, setForm] = useState({});
    const [formElements, setFormElements] = useState([]);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState("");

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
                toast.error("An error occurred: " + error.message);
            }
        };

        getFormStructure();
    }, []);

    const handleInputChange = (e, validations, element_id) => {
        const { name, value } = e.target;

        // Validate the input value
        let errors = {};
        for (const [rule, condition] of Object.entries(validations)) {
            if (rule === "isRequired" && condition && !value.trim()) {
                errors = { ...errors, [name]: "This field is required" };
            }
            if (rule === "minLength" && value.length < condition) {
                errors = { ...errors, [name]: `Minimum length is ${condition}` };
            }
            if (rule === "maxLength" && value.length > condition) {
                errors = { ...errors, [name]: `Maximum length is ${condition}` };
            }
        }

        // Update form data and errors
        setFormData(prevData => ({
            ...prevData,
            [element_id]: value
        }));
        setErrors(errors);
    };

    const handleSubmit = async () => {
        try {
            const response = await submitForm(form._id, formData);
            if (response && response.status === 200) {
                toast.success("Your response has been recorded");
            } else {
                toast.error("Failed to submit form");
            }
        } catch (error) {
            handleFormErrors(error, setErrors, setServerResponse);
        }
    };

    return (
        form ? (
            <div className="flex justify-center items-center min-h-screen p-4">
                <div className="border border-gray-300 rounded p-4 max-w-xl w-[500px] sm:max-w-3xl mx-auto">
                    <h2 className="text-lg font-bold mb-2">{form.title}</h2>
                    <p className="text-gray-700 mb-4">{form.description}</p>

                    <form className="flex flex-col items-center">
                        {/* Loop through form elements */}
                        {form && (
                            formElements.map((element, index) => (
                                <div className="mb-4 w-full sm:w-[400px]" key={index}>
                                    <label htmlFor={`field-${index}`} className="block mb-1 text-sm text-white w-full">{element.name}</label>
                                    <input
                                        type={element.type}
                                        name={element.name}
                                        value={formData[element._id] || ""}
                                        placeholder={element.placeholder}
                                        onChange={(e) => handleInputChange(
                                            e, element.validations, element._id
                                        )}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black" />
                                    <FormErrorDisplay error={errors[element.name]} />
                                </div>
                            ))
                        )}
                        {serverResponse && (
                            <ServerResponseDisplay serverResponse={serverResponse} />
                        )}
                    </form>
                    {/* Render submit button if there are no errors */}
                    {Object.keys(errors).length === 0 && (
                        <div className="mt-5 text-center text-sm text-gray-500">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        ) : (
            <div className="grid mt-12 place-items-center">
                No form found
            </div>
        )
    );
};

export default Form;
