const ErrorContent = ({ status, title, content, refreshPage }) => {
    return (
        <main className="grid min-h-screen w-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                {status && <p className="text-base font-semibold text-indigo-600">{status}</p>}
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-#d6d3d1 sm:text-5xl">
                    {title}
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    {content}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    {refreshPage ? (
                        <button
                            onClick={refreshPage}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Try again
                        </button>
                    ) : (
                        <a
                            href="#"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go back home
                        </a>
                    )}
                    <a
                        href="#"
                        className="rounded-md border border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
        </main>
    );
};

export default ErrorContent;
