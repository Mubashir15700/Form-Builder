const ServerResponseDisplay = ({ serverResponse }) => {
    return (
        <div
            className={`mt-3 ${serverResponse.status === "failed" ?
                "bg-red-500 text-white" :
                "bg-green-500 text-white"} px-4 py-2 rounded-md`}
            role="alert"
        >
            {serverResponse.message}
        </div>
    );
};

export default ServerResponseDisplay;
