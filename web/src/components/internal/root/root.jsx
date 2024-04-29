import { Outlet } from "react-router-dom"
import AppNav from "../../shared/app-nav/app-nav"
import TopBar from "../../shared/top-bar/top-bar"

const Root = ()=>{
    return(
        <div>
            <TopBar/>
            <div className="flex">
                <AppNav/>
                <div className="mt-14 w-full">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Root