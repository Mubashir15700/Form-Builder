const handleFormErrors = (error, setErrors, setServerResponse) => {
    if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach(err => {
            validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
    } else {
        console.error("Error:", error.message);
        setServerResponse({ status: error.status, message: error.message });
    }
};

export default handleFormErrors;
