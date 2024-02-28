const Success = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Congratulations! 🎉</strong>
                <span className="block sm:inline">
                    Your form has been successfully submitted. Thank you for your valuable input. We'll be in touch soon!
                </span>
            </div>
        </div>
    );
};

export default Success;
