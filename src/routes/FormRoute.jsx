import { Routes, Route } from "react-router-dom";
import Form from "../pages/Form";
import Success from "../pages/Success";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/:id" element={<Form />} />
            <Route path="/:id/success" element={<Success />} />
        </Routes>
    );
};

export default UserRoutes;
