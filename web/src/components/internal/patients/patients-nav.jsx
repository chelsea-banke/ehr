import "./patients.css"
import ellipse from "../../../assets/images/ellipse.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, Link } from "react-router-dom"

const PatientsNav = ({patientId})=>{

    const tabs = [
        {
            "path": `/verified/patients/:${patientId}/reports`,
            "name": "Reports"
        },
        {
            "path": `/verified/patients/:${patientId}/tests`,
            "name": "Tests"
        },
        {
            "path": `/verified/patients/:${patientId}/vitals`,
            "name": "Vitals"
        }
    ]

    return(
        <div className="w-full patients-nav bg-primary-green px-2 flex relative">
            <Link to={`/verified/patients/:${patientId}/profile`}>
                <div className="flex ml-3 mt-1">
                    <img src={ellipse} alt="" className="profile-img mt-2" />
                    <div className="ml-2 mt-3 flex">
                        <p className="text-white font-semibold">Jane Doe</p>
                        <FontAwesomeIcon icon="fa-solid fa-link" className="mt-1 ml-2 link-icon" rotation={45} color="white"/>
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

export default PatientsNav