import Routers from "../routes/Routers";

const Layout = () => {
    return (
        // <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        //     {shouldDisplayHeaderFooter && (
        //         userRole === "admin" ? <AdminHeader /> : <Header />
        //     )}
        //     <main style={{ flex: 1, paddingTop: shouldDisplayHeaderFooter ? "72px" : 0 }}>
                <Routers />
        //     </main>
        //     {shouldDisplayHeaderFooter &&
        //         (userRole === "user" && !location.pathname.includes("chat")) &&
        //         <Footer />
        //     }
        // </div>
    );
};

export default Layout;
