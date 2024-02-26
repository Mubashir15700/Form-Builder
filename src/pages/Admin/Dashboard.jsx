import { useState } from "react";
import { useSelector } from "react-redux";
import images from "../../assets/Images";
import NavigationBar from "../../components/NavigationBar";
import DashboardOverview from "../../components/admin/DashboardOverview";
import UsersTable from "../../components/admin/UsersTable";

function Dashboard() {
    const username = useSelector((state) => state.user.username);

    const [activeTab, setActiveTab] = useState("Dashboard");

    const renderTabContent = () => {
        switch (activeTab) {
            case "Dashboard":
                return <DashboardOverview />;
            case "Users":
                return <UsersTable />;
            default:
                return null;
        }
    };

    const navigation = [
        { name: "Dashboard", current: activeTab === "Dashboard" },
        { name: "Users", current: activeTab === "Users" },
    ];

    const user = {
        name: username,
        imageUrl: images.profile
    };

    return (
        <NavigationBar
            role={"admin"}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            renderTabContent={renderTabContent}
            navigation={navigation}
            user={user}
        />
    );
};

export default Dashboard;
