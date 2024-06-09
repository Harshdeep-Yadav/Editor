import Mobilebar from "@/components/shared/Mobilebar";
import SideBar from "@/components/shared/SideBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="root">
            <SideBar/>
            <Mobilebar/>
            <div className="root-container">
                <div className="wrapper">{children}</div>
            </div>
        </main>
    );
};

export default Layout;
