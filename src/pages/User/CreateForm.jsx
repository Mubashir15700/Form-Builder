import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import inputValidationSchema from "../../utils/validations/inputValidationSchema";
import { createForm } from "../../api/user";

const CreateForm = () => {
    const navigate = useNavigate();

    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formElements, setFormElements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showTitleDescriptionModal, setShowTitleDescriptionModal] = useState(false);
    const [fieldName, setFieldName] = useState("");
    const [elementType, setElementType] = useState("text");
    const [isRequired, setIsRequired] = useState(false);
    const [minLength, setMinLength] = useState(0);
    const [maxLength, setMaxLength] = useState(999);

    const addFormElement = () => {
        // Validate minLength and maxLength
        try {
            inputValidationSchema.validateSync({
                minLength,
                maxLength
            }, { abortEarly: false });
        } catch (error) {
            error.inner.forEach(err => {
                toast.error(err.message);
            });
            return;
        }

        if (!fieldName || !elementType) {
            toast.error("Field name and element type are required");
            return;
        }

        const inputProps = {
            placeholder: `Enter ${fieldName}`,
            name: fieldName,
            className: "mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500",
            validations: {
                minLength,
                maxLength,
                isRequired
            }
        };

        let newFormElement;
        switch (elementType) {
            case "text":
            case "password":
            case "number":
            case "email":
                newFormElement = <input type={elementType} {...inputProps} />;
                break;
            case "textarea":
                newFormElement = <textarea {...inputProps} />;
                break;
            default:
                newFormElement = null;
        }

        setFormElements(prevElements => [...prevElements, newFormElement]);
        setShowModal(false);
        setFieldName("");
        setMinLength(0);
        setMaxLength(999);
        setIsRequired(false);
    };

    // Function to handle adding form title and description
    const handleAddTitleDescription = () => {
        setShowTitleDescriptionModal(true);
    };

    // Function to handle submitting form title and description
    const handleSubmitTitleDescription = () => {
        setShowTitleDescriptionModal(false);
    };

    // Function to handle reordering form elements
    const onDragEnd = result => {
        if (!result.destination) return;

        const items = Array.from(formElements);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFormElements(items);
    };

    const handleSaveForm = async () => {
        try {
            if (formTitle && formDescription && formElements.length) {
                const response = await createForm({
                    formTitle,
                    formDescription,
                    formElements
                });
                if (response && response.status === 200) {
                    toast.success("Form saved successfully");
                    navigate("/home");
                } else {
                    toast.error("Failed to save form");
                }
            } else {
                toast.error("Form title, description and atleast one field are required");
            }
        } catch (error) {
            toast.error("An error occured: " + error.message);
        }
    };

    console.log(formElements);

    return (
        <div className="flex px-5 items-center justify-center min-h-screen">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">Custom Form Builder</h1>

                {/* Form */}
                <div className="border border-gray-300 rounded p-4 max-w-xl mx-auto">
                    {/* Form Title and Description */}
                    {formTitle && <h2 className="text-lg font-bold mb-2">{formTitle}</h2>}
                    {formDescription && <p className="text-gray-700 mb-4">{formDescription}</p>}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={uuidv4()}>
                            {(provided) => (
                                <form ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col items-center">
                                    {/* Loop through form elements */}
                                    {formElements.map((element, index) => (
                                        <Draggable key={index} draggableId={`draggable-${index}`} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-4">
                                                    <label htmlFor={`field-${index}`} className="block mb-1 text-sm text-white w-full">{element.props.name}</label>
                                                    {React.cloneElement(element, { className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black" })}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </form>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>

                {/* Container for buttons */}
                <div className="flex justify-center mt-4 space-x-4">
                    {/* Button to add form title and description */}
                    <button onClick={handleAddTitleDescription} className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                        Add Title and Description
                    </button>

                    {/* Button to add form elements */}
                    <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Add Form Element
                    </button>

                    {/* Button to save the form */}
                    <button onClick={handleSaveForm} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600">
                        Save Form
                    </button>
                </div>

                {/* Modal for adding form element */}
                {showModal && (
                    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
                        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full p-6 relative z-50">
                            <h2 className="text-lg font-bold mb-4 text-black">Add Form Element</h2>
                            <div className="mb-4">
                                <label htmlFor="fieldName" className="block text-sm font-medium text-gray-700">Field Name:</label>
                                <input type="text" id="fieldName" value={fieldName} onChange={e => setFieldName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full text-black" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="elementType" className="block text-sm font-medium text-gray-700">Element Type:</label>
                                <select id="elementType" value={elementType} onChange={e => setElementType(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full text-black">
                                    <option value="text">Text Input</option>
                                    <option value="password">Password</option>
                                    <option value="number">Number</option>
                                    <option value="email">Email</option>
                                    <option value="textarea">Textarea</option>
                                </select>
                            </div>
                            <div className="block text-sm font-medium text-gray-700">
                                <p>Validations:</p>
                                <div className="mb-4">
                                    <label htmlFor="isRequired" className="inline-flex items-center mt-2">
                                        <input type="checkbox" id="isRequired" checked={isRequired} onChange={e => setIsRequired(e.target.checked)} className="form-checkbox h-5 w-5 text-blue-500" />
                                        <span className="ml-2">Required</span>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="minLength" className="block text-sm font-medium text-gray-700">Minimum Length:</label>
                                    <input type="number" id="minLength" name="minLength" value={minLength} onChange={e => setMinLength(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full text-black" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="maxLength" className="block text-sm font-medium text-gray-700">Maximum Length:</label>
                                    <input type="number" id="maxLength" name="maxLength" value={maxLength} onChange={e => setMaxLength(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full text-black" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={addFormElement} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add</button>
                                <button onClick={() => setShowModal(false)} className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal for adding form title and description */}
                {showTitleDescriptionModal && (
                    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
                        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full p-6 relative z-50">
                            <h2 className="text-lg font-bold mb-4 text-black">Add Form Title and Description</h2>
                            <div className="mb-4">
                                <label htmlFor="formTitle" className="block text-sm font-medium text-gray-700">Title:</label>
                                <input type="text" id="formTitle" value={formTitle} onChange={e => setFormTitle(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full text-black" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="formDescription" className="block text-sm font-medium text-gray-700">Description:</label>
                                <textarea id="formDescription" value={formDescription} onChange={e => setFormDescription(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full text-black"></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleSubmitTitleDescription} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add</button>
                                <button onClick={() => setShowTitleDescriptionModal(false)} className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateForm;
