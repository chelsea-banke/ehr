import "./staffs.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, Link, Outlet } from "react-router-dom"
import ellipse from "../../../assets/images/ellipse.png"

const StaffsNav = ()=>{

    const patientId = 0
    const tabs = [
        {
            "path": `/verified/staffs/:${patientId}/reports`,
            "name": "Reports"
        },
        {
            "path": `/verified/staffs/:${patientId}/tests`,
            "name": "Tests"
        },
        {
            "path": `/verified/staffs/:${patientId}/vitals`,
            "name": "Vitals"
        }
    ]

    return(
        <div className="w-full patients-nav bg-primary-green px-2 flex relative">
            <Link to={`/verified/staffs/:${patientId}/profile`}>
                <div className="flex ml-3 mt-1">
                    <img src={ellipse} alt="" className="profile-img mt-2" />
                    <div className="ml-2 mt-3 flex">
                        <p className="text-white font-semibold">Jane Doe</p>
                        <div className="text-xs font-extrabold border border-white h-fit ml-2 mt-1 bg-blue-400 px-2 py-u1 rounded-full text-white">doctor</div>
                    </div>
                </div>
            </Link>
            <div className="flex mt-4 text-white ml-10 font-medium">
                {tabs.map(tab=>{
                    return(
                        <NavLink to={tab["path"]} className={`px-10 pb-4 transition-all`}>
                            <div className="transition-all">{tab["name"]}</div>
                        </NavLink>
                    )
                })}
            </div>
            <div className="flex w-2/12 m-auto border-b border-white mt-5 absolute right-10">
                <input type="text" className="w-10/12 patients-search bg-primary-green text-white placeholder:text-white" placeholder="search..."/>
                <button><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" color="white" /></button>
                <button className="ml-2"><FontAwesomeIcon icon="fa-solid fa-sort" color="white"/></button>
            </div>
        </div>
    )
}

export default StaffsNav