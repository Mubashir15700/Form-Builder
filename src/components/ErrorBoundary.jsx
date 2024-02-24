import { useState, useEffect } from "react";
import ErrorContent from "./ErrorContent";

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const errorHandler = (error) => {
            console.error(error);
            setHasError(true);
        };

        // Attach the error handler to the window
        window.addEventListener("error", errorHandler);

        return () => {
            // Detach the error handler when the component unmounts
            window.removeEventListener("error", errorHandler);
        };
    }, []);

    const refreshPage = () => {
        window.location.reload();
    };

    if (hasError) {
        return (
            <ErrorContent
                title={"Something went wrong"}
                content={"We're sorry, but an error occurred while processing this page. Please try again later."}
                refreshPage={refreshPage}
            />
        );
    };

    return children;
};

export default ErrorBoundary;
