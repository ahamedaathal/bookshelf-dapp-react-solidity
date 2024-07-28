import { Outlet } from "react-router-dom";
import NavBar from "./components/sections/NavBar";
import Footer from "./components/sections/Footer";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-1 py-12 px-6 md:px-12 lg:px-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}