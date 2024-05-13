import "./staffs.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, Link, Outlet, useLocation } from "react-router-dom"
import ellipse from "../../../assets/images/ellipse.png"
import StaffsNav from "./staffs-nav"
import Placeholder from "../../shared/placeholder/placeholder"


const Staffs = ()=>{
    const location = useLocation()

    return(
        <div className="staffs bg-gray-50 flex justify-between">
            <div className="staffs-list-container bg-white h-full">
                <div className="flex w-11/12 m-auto border-b border-gray-400 mt-5">
                    <input type="text" className="w-10/12 patients-search" placeholder="search..."/>
                    <button><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" color="gray" /></button>
                    <button className="ml-2"><FontAwesomeIcon icon="fa-solid fa-sort" color="gray"/></button>
                </div>
                <div className="w-full mt-5 patients-list">
                    {[...Array(500).keys()].map(id=>{
                        return(
                            <NavLink to={`/verified/staffs/:${id}/profile`} className={`flex justify-between border-b border-gray-300 px-2 pb-2 rounded-md mx-1 my-2 hover:bg-green-50 transition-all`}>
                                <div className="flex text-gray-600">
                                    <img src={ellipse} alt="" className="profile-img mt-2" />
                                    <p className="mt-3 ml-2 font-semibold">Jane Doe {id}</p>
                                </div>
                                <div className="text-xs font-semibold border  border-blue-400 h-fit mt-3 text-blue-400 px-2 py-1 rounded-full bg-white">doctor</div>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            {location.pathname.split('/').reverse()[0]=='staffs' ? 
                <Placeholder style="w-10/12" text="Staffs"/>: 
                <>
                    <div className="w-10/12">
                        <StaffsNav/>
                        <Outlet />
                    </div>
                </>
            }
            <div className="h-full bg-pale-green border-l pt-80 w-1/6 transition-all">
                <Link to={`/verified/staffs/create-new-staff`}>
                    <button className="block mx-auto">
                        <FontAwesomeIcon icon={['fas', 'file-circle-plus']} size="7x" color="#858C94" className="m-auto block"/>
                        <p className="text-sm font-medium mt-1">create new staff</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Staffs