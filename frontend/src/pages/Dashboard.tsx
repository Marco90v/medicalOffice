import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

function Dashboard() {
    return(
        <main className="w-screen h-screen grid grid-cols-12">
            <Sidebar />
            <section className="col-span-10 p-4 overflow-auto">
                <Outlet />
            </section>
        </main>
    );
}

export default Dashboard;
export { Dashboard };