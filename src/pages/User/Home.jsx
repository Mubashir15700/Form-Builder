import { useState } from "react";
import { useSelector } from "react-redux";
import images from "../../assets/Images";
import NavigationBar from "../../components/NavigationBar";
import HomeOverview from "../../components/user/HomeOverview";
import FormLists from "../../components/FormLists";

function Home() {
  const username = useSelector((state) => state.user.username);

  const [activeTab, setActiveTab] = useState("Home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeOverview setActiveTab={setActiveTab} />;
      case "Projects":
        return <FormLists role={"user"} />;
      default:
        return null;
    }
  };

  const user = {
    name: username,
    imageUrl: images.profile,
  };

  const navigation = [
    { name: "Home", current: activeTab === "Home" },
    { name: "Projects", current: activeTab === "Projects" },
  ];

  return (
    <NavigationBar
      role={"user"}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      renderTabContent={renderTabContent}
      user={user}
      navigation={navigation}
    />
  );
};

export default Home;
