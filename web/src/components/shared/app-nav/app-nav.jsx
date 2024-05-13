import { NavLink, useLocation } from "react-router-dom"
import "./app-nav.css"
import { useEffect, useState } from "react"
import dashboard from "../../../assets/icons/dashboard.svg"
import patients from "../../../assets/icons/patients.svg"
import history from "../../../assets/icons/history.svg"
import staffs from "../../../assets/icons/staffs.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const links = [
    {
        path: "/verified/dashboard",
        text: "Dashboard",
        icon: dashboard
    },
    {
        path: "/verified/patients",
        text: "Patients",
        icon: patients
    },
    {
        path: "/verified/staffs",
        text: "Staffs",
        icon: staffs
    },
    {
        path: "/verified/history",
        text: "History",
        icon: history
    }
]

const AppNav = ()=>{
    const iconNavPages = ['patients', 'staffs']
    const [navDisplay, setNavDisplay] = useState('full')

    return(
        <nav className={`bg-pale-green w-fit py-10 h-screen transition-all ${navDisplay=='full' ? 'full-nav': 'mid-nav border-r'}`}>
            <div className="bg-white border-t border-b border-primary-green mt-20">
                {links.map(link=>{
                    return(
                        <NavLink to={link["path"]} key={link['text']} className={`block border-primary-green ${({isActive}) => isActive ? "active" : ""} hover:border-l-8 transition-all`} onClick={()=>{
                            iconNavPages.includes(link["text"].toLowerCase()) ? setNavDisplay('mid') : setNavDisplay('full')
                        }}>
                            <div className={`pl-6 my-6i text-xl text-gray-500 font-medium py-4 overflow-hidden ${navDisplay=='full' ? 'pr-20' : ''}`}>
                                <img src={link["icon"]} className="icon inline mr-2 mb-1" alt="" />
                                {navDisplay=='full'? link["text"] : '' } 
                            </div>
                        </NavLink>
                    )
                })}
            </div>
            <div className="absolute bottom-10 bg-white border border-gray-800 rounded-r-full pl-4 pr-6 py-2 w-fit">
                <FontAwesomeIcon icon="fa-right-from-bracket" />
                {navDisplay=='full'? ' Logout' : '' } 
            </div>
        </nav>
    )
}

export default AppNav