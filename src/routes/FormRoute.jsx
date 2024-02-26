import { Routes, Route } from "react-router-dom";
import Form from "../pages/Form";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/:id" element={<Form />} />
        </Routes>
    );
};

export default UserRoutes;
