import { Outlet, useNavigate } from "react-router-dom"
import AppNav from "../../shared/app-nav/app-nav"
import TopBar from "../../shared/top-bar/top-bar"
import Placeholder from "../../shared/placeholder/placeholder"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const Root = ()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        const authToken = Cookies.get('jwt');
        if (authToken) {
            setIsAuthenticated(true);
        }
        // return(
        //     Cookies.remove('jwt')
        // )
    }, []);

    if(isAuthenticated){
        return(
            <div className="overflow-hidden h-screen bg-gray-50">
                <TopBar/>
                <div className="flex">
                    <AppNav/>
                    <div className="mt-14 w-full">
                        <Outlet/>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        )
    }
    else{
        return(
            <div className="mt-40">
                <Placeholder text="Not Authrized" style={'text-9xl'}/>
            </div>
        )
    }
}

export default Root