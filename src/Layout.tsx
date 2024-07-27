import { Outlet } from "react-router-dom";
import NavBar from "./components/sections/NavBar";
import Footer from "./components/sections/Footer";

export default function Layout() {
    return (
        <div>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}