import ErrorContent from "../components/ErrorContent";

const Error404 = () => {
  return (
    <ErrorContent
      status={404}
      title={"Page not found"}
      content={"Sorry, we couldn’t find the page you’re looking for."}
    />
  );
};

export default Error404;
