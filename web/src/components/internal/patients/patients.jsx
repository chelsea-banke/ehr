import { Outlet, NavLink, useNavigate, useLocation, Link } from "react-router-dom"
import PatientsNav from "./patients-nav"
import "./patients.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ellipse from "../../../assets/images/ellipse.png"
import { useState } from "react"
import Placeholder from "../../shared/placeholder/placeholder"

const Patients = ()=>{
    const patientIds = [...Array(500).keys()]
    const [patientId, setPatientId] = useState(patientIds[0])
    const navigate = useNavigate()
    const location = useLocation()

    return(
        <div className="flex justify-between h-full patients bg-gray-50">
            <div className="patients-list-container bg-white h-full">
                <div className="flex w-11/12 m-auto border-b border-gray-400 mt-5">
                    <input type="text" className="w-10/12 patients-search" placeholder="search..."/>
                    <button><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" color="gray" /></button>
                    <button className="ml-2"><FontAwesomeIcon icon="fa-solid fa-sort" color="gray"/></button>
                </div>
                <div className="w-full mt-5 patients-list">
                    {patientIds.map(id=>{
                        return(
                            <NavLink to={`/verified/patients/:${id}/profile`} className={`flex justify-between border-b border-gray-300 px-2 pb-2 rounded-md mx-1 my-2 hover:bg-green-50 transition-all`} onClick={()=>{
                                navigate(`/verified/patients/:${id}/reports`)
                                setPatientId(id)
                            }}>
                                <div className="flex text-gray-600">
                                    <img src={ellipse} alt="" className="profile-img mt-2" />
                                    <p className="mt-3 ml-2 font-semibold">Jane Doe {id}</p>
                                </div>
                                <FontAwesomeIcon icon="fa-solid fa-link" className="mt-4 ml-2 link-icon" rotation={45}/>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            {location.pathname.split('/').reverse()[0]=='patients' ? 
                <Placeholder text="Patients"/> : 
                <>
                    <div className="w-10/12">
                        <PatientsNav patientId={patientId}/>
                        <Outlet />
                    </div>
                    <div className="h-full w-1/6 bg-pale-green border-l pt-80">
                        <Link to={`/verified/patients/:${patientId}/create-new-report`}>
                            <button className="block mx-auto">
                                <FontAwesomeIcon icon={['fas', 'file-circle-plus']} size="7x" color="#858C94" className="m-auto block"/>
                                <p className="text-sm font-medium mt-1">create new report</p>
                            </button>
                        </Link>
                    </div>
                </>
            }
        </div>
    )
}

export default Patients