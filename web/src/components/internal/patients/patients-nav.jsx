import "./patients.css"
import ellipse from "../../../assets/images/ellipse.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchReports } from "../../../store/slices/reportListSlice"
import { fetchTests } from "../../../store/slices/testListSlice"

const PatientsNav = ()=>{

    const patient = useSelector(state => state.patient)
    const role = useSelector(state => state.role)
    const dispatch = useDispatch()

    return(
        <div className="w-full patients-nav bg-primary-green px-2 flex relative z-0">
            <Link to={`/verified/patients/:${patient['username']}/profile`} className="w-fit profile-id">
                <div className="flex ml-3 mt-1">
                    <img src={ellipse} alt="" className="profile-img mt-2" />
                    <div className="ml-2 mt-3 flex">
                        <p className="text-white font-semibold">{patient['firstName']} {patient['lastName']}</p>
                        {patient['status'] == 'connected' ?
                                <FontAwesomeIcon icon="fa-solid fa-link" className="mt-1 ml-2 link-icon" rotation={45} color="white"/>
                            :
                                <FontAwesomeIcon icon="fa-solid fa-unlink" className="mt-1 ml-2 link-icon" rotation={45} color="white"/>
                        }
                        {/* <FontAwesomeIcon icon="fa-solid fa-link" className="mt-1 ml-2 link-icon" rotation={45} color="white"/> */}
                    </div>
                </div>
            </Link>
            <div className="flex mt-4 text-white ml-10 font-medium">
                <NavLink to={`/verified/patients/:${patient['username']}/reports`} onClick={async () => {
                        await dispatch(fetchReports({role: role, patientUsername: patient['username']}))
                        await dispatch(fetchTests({role: role, patientUsername: patient['username']}))
                    }}
                    className={`px-10 pb-4 transition-all`}>
                    <div className="transition-all">Reports</div>
                </NavLink>

                <NavLink to={`/verified/patients/:${patient['username']}/tests`} onClick={async () => {
                        await dispatch(fetchTests({role: role, patientUsername: patient['username']}))
                    }}
                    className={`px-10 pb-4 transition-all`}>
                    <div className="transition-all">Tests</div>
                </NavLink>

                <NavLink to={`/verified/patients/:${patient['username']}/vitals`} className={`px-10 pb-4 transition-all`}>
                    <div className="transition-all">Vitals</div>
                </NavLink>

                <NavLink to={`/verified/patients/:${patient['username']}/ai-assist`} className={`px-10 pb-4 transition-all`}>
                    <div className="transition-all">AI Assist</div>
                </NavLink>
            </div>
            <div className="flex w-2/12 m-auto border-b border-white mt-5 absolute right-10">
                <input type="text" className="w-10/12 patients-search bg-primary-green text-white placeholder:text-white plane-input" placeholder="search..."/>
                <button><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" color="white" /></button>
                <button className="ml-2"><FontAwesomeIcon icon="fa-solid fa-sort" color="white"/></button>
            </div>
        </div>
    )
}

export default PatientsNav