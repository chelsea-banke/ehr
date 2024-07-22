import { Outlet } from "react-router-dom"
import StaffsNav from "./staffs-nav"

const Staff = ()=>{
    return(
        <div className="w-10/12">
            <StaffsNav/>
            <Outlet />
        </div>
    )
}

export default Staff