import { useParams, useLocation } from "react-router-dom";
import FormLists from "../../components/FormLists";

const UserFormsLists = () => {
    const { userId } = useParams(); // Accessing the userId parameter from the URL

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("username"); // Accessing the username query parameter

    return (
        <div className="mt-10 px-4">
            <h1>Forms created by {username}</h1>
            <FormLists role={"admin"} userId={userId} />
        </div>
    );
};

export default UserFormsLists;
