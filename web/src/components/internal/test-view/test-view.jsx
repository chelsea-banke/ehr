import { useDispatch, useSelector } from "react-redux"
import AppButton from "../../shared/app-button/app-button"
import "./test-view.css"
import Placeholder from "../../shared/placeholder/placeholder"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fetchReport } from "../../../store/slices/reportSlice"

const TestView = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const test = (useSelector(state => state.test)).test
    const patient = useSelector(state => state.patient)
    const staff = useSelector(state => state.staff)
    const role = useSelector(state => state.role)
    const user= useSelector(state => state.user)
    const location = useLocation()

    console.log(test)
    useEffect(()=>{
        console.log(test);
    }, [])

    return (
        <div>
            <div className="flex justify-between sticky pt-6 top-0 bg-gray-50 mx-6">
                <div className="font-medium text-gray-500 border-b border-gray-400 pb-2 flex justify-start w-1/2">
                    <div className="w-fit">
                        <div>test id: 
                            <span className="ml-3 text-gray-900">{test['testId']}</span>
                        </div>
                        <div>date created: 
                            <span className="ml-3 text-gray-900">{test['dateCreated'].slice(0, 10)}</span>
                        </div>
                    </div>
                    <div className="w-fit mx-20">
                        <div>doctor: 
                            <span className="ml-3 text-gray-900">{test['doctorUsername']}</span>
                        </div>
                        <div>health center: 
                            <span className="ml-3 text-gray-900">{test['doctorCenterCenterId']}</span>
                        </div>
                    </div>
                    <div className="">
                        <div>test id: 
                            <span className="ml-3 text-gray-900">01</span>
                        </div>
                        <div>test name: 
                            <span className="ml-3 text-gray-900">01</span>
                        </div>
                    </div>
                </div>
                <div className="ml-6 w-1/2 h-fit flex justify-evenly">
                    <button className="w-full text-center my-5 font-medium text-primary-green" onClick={async ()=>{
                            await dispatch(fetchReport({role: role, reportId: test['reportReportId']}))
                            location.pathname.split('/')[2] == 'patients' ?
                                navigate(`/verified/patients/:${patient['username']}/reports/:${test['reportId']}`)
                            :
                                navigate(`/verified/staffs/:${staff['username']}/reports/:${test['reportId']}`)
                        }}>
                        Report
                        <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" className="navigation-icon mx-2" color="#0EB29A" />
                    </button>
                    {role == 'labtech' ? 
                        <Link className="w-full" to={`/verified/patients/:${patient['username']}/reports/:${report['reportId']}/edit-report`}>
                            <AppButton text={"Edit"} style={"button"}/>
                        </Link>
                        :
                        <></>
                    }
                    <div className="ml-3 w-full">
                        <AppButton text={"Download"} style={"bg-blue-500 text-white border-blue-500"}/>
                    </div>
                    <div className="mt-2 h-fit ml-2 flex">
                        <button className="px-3 blue-400 py-2 bgh-primary-green border rounded-l-full">
                            <FontAwesomeIcon icon="fa-solid fa-angle-left" size="xl" color="#3b82f6" className="navigation-icon"/>
                        </button>
                        <div className="px-2 mt-2 text-xl text-blue-700">5</div>
                        <button className="px-3 blue-400 py-2 bgh-primary-green border rounded-r-full">
                            <FontAwesomeIcon icon="fa-solid fa-angle-right" size="xl" color="#3b82f6" className="navigation-icon"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mx-6 mt-10 flex">
                <div className="w-3/4">
                    <h3 className="text-xl font-medium">Description</h3>
                    <p className="p-4 bg-white border">
                        {test['description']}
                        {test['description'].length == 0 ? <Placeholder style={'text-3xl'} text="No description recorded" /> : <></>}
                    </p>
                </div>
                <div className="ml-5">
                    <h3 className="text-xl font-medium">Result</h3>
                    <p className="p-4 bg-white border">
                        {test['results']}
                        {test['results'] == null ? <Placeholder style={'text-3xl'} text="No results recorded" /> : <></>}
                    </p>
                </div>
            </div>
            <div className="mx-6 mt-10 flex">
                <h3 className="text-xl font-medium">details</h3>
                <div>

                </div>
            </div>
        </div>
    )
}

export default TestView