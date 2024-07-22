import "./staffs.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, Link, Outlet } from "react-router-dom"
import ellipse from "../../../assets/images/ellipse.png"
import { useDispatch, useSelector } from "react-redux"
import { fetchReports } from "../../../store/slices/reportListSlice"
import { fetchTests } from "../../../store/slices/testListSlice"

const StaffsNav = ()=>{
    const role = useSelector(state => state.role)
    const staff = useSelector(state => state.staff)
    const dispatch = useDispatch()

    return(
        <div className="w-full patients-nav bg-primary-green px-2 flex relative">
            <Link to={`/verified/staffs/:${staff['username']}/profile`}>
                <div className="flex ml-3 mt-1">
                    <img src={ellipse} alt="" className="profile-img mt-2" />
                    <div className="ml-2 mt-3 flex">
                        <p className="text-white font-semibold">{staff['firstName']} {staff['lastName']}</p>
                        <div className="text-xs font-extrabold border border-white h-fit ml-2 mt-1 bg-blue-600 px-2 py-u1 rounded-full text-white">{staff['role']}</div>
                    </div>
                </div>
            </Link>
            <div className="flex mt-4 text-white ml-10 font-medium">
                <NavLink to={`/verified/staffs/:${staff['username']}/reports`} onClick={async () => {
                        await dispatch(fetchReports({role: role, doctorUsername: staff['username']}))
                        await dispatch(fetchTests({role: role, doctorUsername: staff['username']}))
                    }}className={`px-10 pb-4 transition-all`}>
                    <div className="transition-all">Reports</div>
                </NavLink>
                <NavLink to={`/verified/staffs/:${staff['username']}/tests`} onClick={async () => {
                        await dispatch(fetchTests({role: role, doctorUsername: staff['username']}))
                    }} className={`px-10 pb-4 transition-all`}>
                    <div className="transition-all">Tests</div>
                </NavLink>
                <NavLink to={`/verified/staffs/:${staff['username']}/logs`} className={`px-10 pb-4 transition-all`}>
                    <div className="transition-all">Logs</div>
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

export default StaffsNav