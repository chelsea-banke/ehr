import "./staffs.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, Link, Outlet, useLocation } from "react-router-dom"
import ellipse from "../../../assets/images/ellipse.png"
import Placeholder from "../../shared/placeholder/placeholder"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchStaffs } from "../../../store/slices/staffsListSlice"
import { fetchReports } from "../../../store/slices/reportListSlice";
import { fetchTests } from "../../../store/slices/testListSlice"
import { updateStaff } from "../../../store/slices/staffSlice"


const Staffs = ()=>{
    const staffsList = useSelector(state => state.staffsList)
    const user = useSelector(state => state.user)
    const role = useSelector(state => state.role)
    const dispatch = useDispatch()
    const location = useLocation()
    const [staffFilter, setStaffFilter] = useState('')
    const [checkedRoles, setCheckedRoles] = useState(['doctor', 'nurse', 'labtech'])
    useEffect(()=>{
        dispatch(fetchStaffs(user['centerCenterId']))
    }, [])

    return(
        <div className="staffs bg-gray-50 flex justify-between">
            <div className="staffs-list-container bg-white h-full">
                <div className="w-11/12 m-auto mt-2">
                    <div className="py-1 px-2 mt-1 flex justify-between bg-blue-100 flex-wrap">
                        <div className="">
                            <input type="checkbox" id="doctorsCheckbox" checked={checkedRoles.includes('doctor')} onClick={()=>{checkedRoles.includes('doctor') ? setCheckedRoles(checkedRoles.filter(role => role != 'doctor')) : setCheckedRoles([...checkedRoles, 'doctor'])}}/>
                            <label className="ml-1 hover:cursor-pointer" htmlFor="doctorsCheckbox">Doctors</label>
                        </div>
                        <div>
                            <input type="checkbox" id="nursesCheckbox" checked={checkedRoles.includes('nurse')}  onClick={()=>{checkedRoles.includes('nurse') ? setCheckedRoles(checkedRoles.filter(role => role != 'nurse')) : setCheckedRoles([...checkedRoles, 'nurse'])}}/>
                            <label className="ml-1 hover:cursor-pointer" htmlFor="nursesCheckbox">nurses</label>
                        </div>
                        <div>
                            <input type="checkbox" id="labtechsCheckbox" checked={checkedRoles.includes('labtech')}  onClick={()=>{checkedRoles.includes('labtech') ? setCheckedRoles(checkedRoles.filter(role => role != 'labtech')) : setCheckedRoles([...checkedRoles, 'labtech'])}}/>
                            <label className="ml-1 hover:cursor-pointer" htmlFor="labtechsCheckbox">labtechs</label>
                        </div>
                    </div>
                    <div className="flex justify-between border-b border-gray-400 mt-4">
                        <input type="text" className="w-10/12 patients-search plane-input" placeholder="search by username..." value={staffFilter} onChange={(e)=>{setStaffFilter(e.target.value)}}/>
                        {staffFilter == ''
                        ?
                        <button><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" color="gray" /></button>
                        :
                        <button onClick={()=>{setStaffFilter('')}}><FontAwesomeIcon icon="fa-solid fa-close" color="gray"/></button>   
                        }
                        <button className="ml-2"><FontAwesomeIcon icon="fa-solid fa-sort" color="gray"/></button>
                    </div>
                </div>
                <div className="w-full mt-1 patients-list">
                    {staffsList.staffs.filter(staff => checkedRoles.includes(staff['role'])).filter(staff => staff['username'].toLocaleLowerCase().includes(staffFilter.toLocaleLowerCase())).map(staff=>{
                        return(
                            <NavLink to={`/verified/staffs/:${staff['username']}/profile`} onClick={async ()=>{
                                    dispatch(updateStaff(staff))
                                    await dispatch(fetchReports({role: role, doctorUsername: staff['username']}))
                                    await dispatch(fetchTests({role: role, doctorUsername: staff['username']}))
                                }} className={`flex justify-between border-b border-gray-300 px-2 pb-2 rounded-md mx-1 my-2 hover:bg-green-50 transition-all`}>
                                <div className="flex text-gray-600">
                                    <img src={ellipse} alt="" className="profile-img mt-2" />
                                    <div>
                                        <p className="mt-1 ml-2 font-semibold">{staff['firstName']} {staff['lastName']}</p>
                                        <p className="text-sm ml-2">{staff['username']}</p>
                                    </div>
                                </div>
                                <div className="text-xs font-semibold border  border-blue-400 h-fit mt-3 text-blue-400 px-2 py-1 rounded-full bg-white">{staff['role']}</div>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            {location.pathname.split('/').reverse()[0]=='staffs' ? 
                <Placeholder style="w-10/12 text-8xl mt-80" text="select staff"/>: 
                <>
                    <Outlet/> 
                </>
            }
            <div className="h-full bg-pale-green border-l pt-80 w-1/6 transition-all">
                <Link to={`/verified/staffs/create-new-staff`}>
                    <button className="block mx-auto">
                        <FontAwesomeIcon icon={['fas', 'user-plus']} size="7x" color="#858C94" className="m-auto block"/>
                        <p className="text-sm font-medium mt-1 mr-10">create new staff</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Staffs