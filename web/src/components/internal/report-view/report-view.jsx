import { useDispatch, useSelector } from "react-redux"
import AppButton from "../../shared/app-button/app-button"
import "./report-view.css"
import Placeholder from "../../shared/placeholder/placeholder"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fetchTest } from "../../../store/slices/testSlice"
import { reloadStates } from "../../../services/reload"
import { toast } from "react-toastify"
import { updateReport } from "../../../store/slices/reportSlice"

const ReportView = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const report = (useSelector(state => state.report)).report
    const patient = useSelector(state => state.patient)
    const reports = (useSelector(state => state.reportsList)).reports
    const position = reports.filter(rep => rep['reportId']==report['reportId'])[0]['position']
    const tests = (useSelector(state => state.testsList).tests).filter(test=>test['reportReportId']==report['reportId'])
    const staff = useSelector(state => state.staff)
    const role = useSelector(state => state.role)
    const user = useSelector(state => state.user)
    const location = useLocation()
    
    useEffect(()=>{
        
    }, [])

    return (
        <div className="report-view">
            <div className="flex justify-between sticky pt-6 top-0 bg-gray-50 mx-6">
                <div className="font-medium text-gray-500 border-b border-gray-400 pb-2 flex justify-start">
                    <div className="w-fit">
                        <div>report id: 
                            <span className="ml-3 text-gray-900">{report['reportId']}</span>
                        </div>
                        <div>date created: 
                            <span className="ml-3 text-gray-900">{report['dateCreated'].slice(0, 10)}</span>
                        </div>
                    </div>
                    <div className="w-fit mx-20">
                        <div>doctor: 
                            <span className="ml-3 text-gray-900">{report['doctorUsername']}</span>
                        </div>
                        <div>health center: 
                            <span className="ml-3 text-gray-900">{report['doctorCenterCenterId']}</span>
                        </div>
                    </div>
                    <div className="">
                        <div>test count: 
                            <span className="ml-3 text-gray-900">01</span>
                        </div>
                        <div>prescriptions count: 
                            <span className="ml-3 text-gray-900">01</span>
                        </div>
                    </div>
                </div>
                <div className="ml-6 controls-container h-fit flex justify-evenly">
                    {role == 'doctor' && user['username'] == report['doctorUsername'] && user['centerCenterId'] == report['doctorCenterCenterId'] && patient['status']=='connected'? 
                            <AppButton text={"Edit"} style={"button"} handleClick={async ()=>{
                                navigate(`/verified/patients/:${patient['username']}/reports/:${report['reportId']}/edit-report`)
                                // await reloadStates().then(()=>{
                                //     if(patient['status']=='connected'){
                                //         navigate(`/verified/patients/:${patient['username']}/reports/:${report['reportId']}/edit-report`)
                                //     }
                                //     else{
                                //         toast.error('patient disconncted')
                                //     }
                                // })
                            }}/>
                        :
                        <></>
                    }
                    <div className="mx-1"></div>
                    <AppButton text={"Download"} style={"bg-blue-500 text-white border-blue-500 h-fit"}/>
                    <div className="mt-2 ml-2 flex">
                        <button className="px-3 blue-400 py-2 bgh-primary-green border rounded-l-full" onClick={() => {
                            let dec = position
                            dec == 0 ? dec = reports.length-1 : dec-=1
                            dispatch(updateReport(reports.filter(rep => rep['position'] == dec)[0]))
                        }}>
                            <FontAwesomeIcon icon="fa-solid fa-angle-left" size="xl" color="#3b82f6" className="navigation-icon"/>
                        </button>
                        <div className="px-2 mt-2 text-xl text-blue-700">{position}</div>
                        <button className="px-3 blue-400 py-2 bgh-primary-green border rounded-r-full" onClick={() => {
                            dispatch(updateReport(reports.filter(rep => rep['position'] == ((position+1)%reports.length))[0]))
                        }}>
                            <FontAwesomeIcon icon="fa-solid fa-angle-right" size="xl" color="#3b82f6" className="navigation-icon"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-10 mx-6">
                <div className="diagnosis w-1/2">
                    <div className="">
                        <h3 className="text-xl font-medium">Diagnosis</h3>
                        <p className="p-4 bg-white border">
                            {report['diagnosis']}
                            {report['diagnosis'].length == 0 ? <Placeholder style={'text-3xl'} text="No diagnosis recorded" /> : <></>}
                        </p>
                    </div>
                    <div className="mt-10 h-full">
                        <h3 className="text-xl font-medium">Prescriptions</h3>
                        <div className="diagnosis border-l pl-2 border-gray-400 bg-gray-100 rounded-lg prescriptions-container">
                            {JSON.parse(report['prescriptions']).map(pres=>{
                                return(
                                    <div className="w-full border-l border-b border-gray-400 mb-5">
                                        <div className="p-3 pb-2">
                                            <h4 className="text-lg text-primary-green bg-white w-fit px-2 pt-1 rounded-t font-medium">{pres['name']}<span className="ml-2 text-blue-500">( {pres['type']} )</span></h4>
                                            <div className="w-full flex justify-between">
                                                <div className="flex w-full justify-between text-center bg-white px-4 py-4 rounded-lg rounded-tl-none">
                                                    <div className="bg-gray-100 rounded w-1/3">
                                                        <div className="bg-gray-200 py-2 px-4">morning</div>
                                                        <div className="text-xl font-medium py-2">{pres['morning']}</div>
                                                    </div>
                                                    <div className="bg-gray-100 rounded w-1/3 mx-4">
                                                        <div className="bg-gray-200 py-2 px-4">afternoon</div>
                                                        <div className="text-xl font-medium py-2">{pres['noon']}</div>
                                                    </div>
                                                    <div className="bg-gray-100 rounded w-1/3">
                                                        <div className="bg-gray-200 py-2 px-4">evening</div>
                                                        <div className="text-xl font-medium py-2">{pres['evening']}</div>
                                                    </div>
                                                </div>
                                                {/* <button className="w-fit mx-4 ml-6 mt-7" onClick={()=>{setPrescriptions((prescriptions)=>prescriptions.filter(presTest => presTest !== pres))}}>
                                                        <FontAwesomeIcon icon="fa-solid fa-trash-can" size="lg"/>
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>     
                                )
                            })}
                            {JSON.parse(report['prescriptions']).length == 0 ? <Placeholder style={'text-3xl py-40'} text="No drugs prescribed yet" /> : <></>}
                        </div>
                    </div>
                </div>
                <div className="diagnosis w-1/2">
                    <h3 className="w-full text-xl font-medium">Tests</h3>
                    <div className="w-full tests-container bg-gray-100 mt-2 py-1">
                        {tests.map(test=>{
                            return(
                            <div className="p-4 mx-2 bg-white rounded-md my-4 hover:cursor-pointer hover:bg-pale-green transition-all" onClick={async ()=>{
                                await dispatch(fetchTest({role: role, testId: test['testId']}))
                                navigate(`/verified/patients/0/tests/${test['testId']}`)
                                location.pathname.split('/')[2] == 'patients' ?
                                    navigate(`/verified/patients/:${patient['username']}/tests/:${test['testId']}`)
                                :
                                    navigate(`/verified/staffs/:${staff['username']}/tests/:${test['testId']}`)
                            }}>
                                <h4 className="text-lg text-primary-green">{test['testName']}</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aliquid ipsum. Iste esse, id nobis quo maiores laudantium. Quisquam velit suscipit error atque rem nisi non. Nemo quisquam repellendus dolor!</p>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportView