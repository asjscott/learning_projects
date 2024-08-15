import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Root() {
    return (
        <div className=" w-full h-screen font-sans m-0">
            <Navbar />
            <Outlet />
        </div>
    )
}