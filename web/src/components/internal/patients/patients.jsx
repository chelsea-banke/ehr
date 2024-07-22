import { Outlet, NavLink, useNavigate, useLocation, Link, json } from "react-router-dom"
import PatientsNav from "./patients-nav"
import "./patients.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ellipse from "../../../assets/images/ellipse.png"
import { useState, useEffect } from "react"
import Placeholder from "../../shared/placeholder/placeholder"
import { fetchPatients } from "../../../store/slices/patientsListSlice"
import { fetchReports } from "../../../store/slices/reportListSlice";
import { fetchTests } from "../../../store/slices/testListSlice"
import { useDispatch, useSelector } from "react-redux"
import { updatePatient } from "../../../store/slices/patientSlice"
import requests from "../../../services/requests"
import { updateReport } from "../../../store/slices/reportSlice"
import { reloadStates } from "../../../services/reload"
import { toast } from "react-toastify"

const Patients = ()=>{
    const [patientFilter, setPatientFilter] = useState('')
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const patientsList = useSelector(state => state.patientsList)
    const role = useSelector(state => state.role)
    const patient = useSelector(state => state.patient)
    const user = useSelector(state => state.user)
    const report = useSelector(state => state.report).report
    const [checkedStatus, setCheckedStatus] = useState(['connected', 'disconnected'])
    
    useEffect(()=>{
        dispatch(fetchPatients({role: role, centerId: user['centerCenterId']}))
    }, [])

    return(
        <div className="flex justify-between h-full patients bg-gray-50">
            <div className="patients-list-container bg-white h-full">
                <div className="w-11/12 m-auto ">
                    <div className="py-1 px-2 mt-2 flex justify-between bg-blue-100 flex-wrap">
                        <div className="">
                            <input type="checkbox" id="connectedCheckbox" checked={checkedStatus.includes('connected')} onClick={()=>{checkedStatus.includes('connected') ? setCheckedStatus(checkedStatus.filter(status => status != 'connected')) : setCheckedStatus([...checkedStatus, 'connected'])}}/>
                            <label className="ml-1 hover:cursor-pointer" htmlFor="connectedCheckbox">Connected</label>
                        </div>
                        <div>
                            <input type="checkbox" id="disconnectedCheckbox" checked={checkedStatus.includes('disconnected')} onClick={()=>{checkedStatus.includes('disconnected') ? setCheckedStatus(checkedStatus.filter(status => status != 'disconnected')) : setCheckedStatus([...checkedStatus, 'disconnected'])}}/>
                            <label className="ml-1 hover:cursor-pointer" htmlFor="disconnectedCheckbox">Disconnected</label>
                        </div>
                    </div>
                    <div className="flex justify-between border-b border-gray-400 mt-5">
                        <input type="text" value={patientFilter} className="w-10/12 patients-search plane-input" placeholder="search by username..." onChange={(e)=>{setPatientFilter(e.target.value.toLocaleLowerCase())}} />
                        {patientFilter == ''
                            ?
                            <button><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" color="gray" /></button>
                            :
                            <button onClick={()=>{setPatientFilter('')}}><FontAwesomeIcon icon="fa-solid fa-close" color="gray"/></button>   
                        }
                        <button className="ml-2"><FontAwesomeIcon icon="fa-solid fa-sort" color="gray"/></button>
                    </div>
                </div>
                <div className="w-full mt-3 patients-list">
                    {patientsList.patients.filter(patient => checkedStatus.includes(patient['status'])).filter(patient => patient['username'].toLocaleLowerCase().includes(patientFilter)).map(patient=>{
                        return(
                            <NavLink id={patient['username']} to={`/verified/patients/:${patient['username']}/profile`}  onClick={async ()=>{
                                    dispatch(updatePatient(patient))
                                    await dispatch(fetchReports({role: role, doctorUsername: patient['username']}))
                                    await dispatch(fetchTests({role: role, doctorUsername: patient['username']}))
                                }} className={`flex justify-between px-2 pb-2 rounded-md mx-1 my-2 hover:bg-green-50 transition-all ${patient['status'] == 'connected' ? 'border border-primary-green bg-green-50' : 'border-b border-gray-300'}`}>
                                <div className="flex text-gray-600">
                                    <img src={ellipse} alt="" className="profile-img mt-2" />
                                    <div>
                                        <p className="mt-1 ml-2 font-semibold">{patient['firstName']} {patient['lastName']}</p>
                                        <p className="text-sm ml-2">{patient['username']}</p>
                                    </div>
                                </div>
                                {patient['status'] == 'connected' ?
                                        <FontAwesomeIcon icon="fa-solid fa-link" className="mt-4 ml-2 link-icon" rotation={45} color="green"/>
                                    :
                                        <FontAwesomeIcon icon="fa-solid fa-unlink" className="mt-4 ml-2 link-icon" rotation={45}/>
                                }
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            {location.pathname.split('/').reverse()[0]=='patients' ? 
                <Placeholder text="select patient" style={'text-8xl mt-80'}/> : 
                <>
                    <div className="w-10/12">
                        <PatientsNav/>
                        <Outlet />
                    </div>
                    <div className="h-full w-1/6 bg-pale-green border-l pt-80">
                        {role == 'doctor' ? 
                            <button className="block mx-auto" onClick={async ()=>{
                                await reloadStates()
                                patient['status'] == 'connected' ?
                                    await requests.postRequest('http://localhost:3000/ehr/doctor/create-report' ,{
                                        "diagnosis": '',
                                        "prescriptions":  JSON.stringify([]),
                                        "doctorUsername": user['username'],
                                        "doctorCenterCenterId":	user['centerCenterId'],
                                        "patientUsername": patient['username'],
                                        "dateCreated": new Date().toISOString()
                                    }).then(response=>{
                                        console.log(response);
                                        if(response.success){
                                            toast.success(response.message)
                                            dispatch(updateReport(response['data']))
                                            navigate(`/verified/patients/:${patient['username']}/reports/${report['reportId']}/edit-report`)
                                        }
                                    })
                                :
                                    console.log('not connected...');
                            }}>
                                <FontAwesomeIcon icon={['fas', 'file-circle-plus']} size="7x" color={`${patient['status'] == 'connected' ? '#858C94' : '#d1d5db'}`} className="m-auto block"/>
                                <p className={`text-sm font-medium mt-1 ${patient['status'] == 'connected' ? 'text-gray-600' : 'text-gray-400'}`}>create new report</p>
                            </button>
                            :
                            <></>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Patients