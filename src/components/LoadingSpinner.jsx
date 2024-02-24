import { Audio } from "react-loader-spinner";

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="mt-8">
                <Audio
                    type="Audio"
                    height={80}
                    width={80}
                    radius={9}
                    color="blue"
                    ariaLabel="Loading"
                />
            </div>
        </div>
    );
};

export default LoadingSpinner;
