import { useDispatch, useSelector } from "react-redux"
import profileImage from "../../../assets/images/profile-image.png"
import AppButton from "../../shared/app-button/app-button"
import "./patient-profile.css"
import { useEffect, useState } from "react"
import { fetchReports } from "../../../store/slices/reportListSlice";
import { fetchTests } from "../../../store/slices/testListSlice"
import requests from "../../../services/requests"

const PatientProfile = ()=>{
    const dispatch =useDispatch()
    const patient = useSelector(state => state.patient)
    const reportsCount = (useSelector(state => state.reportsList)).reports.length
    const testsCount = (useSelector(state => state.testsList)).tests.length
    const role = useSelector(state => state.role)

    useEffect(()=>{
        dispatch(fetchReports({role: role, patientUsername: patient['username']}))
        dispatch(fetchTests({role: role, patientUsername: patient['username']}))
    }, [])
    
    return(
        <div className="patient-profile mx-6">
            <div className="mt-16 flex justify-evenly border-b border-gray-500 pb-4">
                <div className="flex justify-evenly border-r pr-10 border-gray-500 w-1/2">
                    <img src={profileImage} className="profile-img" alt="" />
                    <div className="mx-10 text-lg text-gray-700 w-full">
                        <div className="my-2 flex justify-between bg-gray-200 w-full px-2 py-1 rounded-md">
                            <div>username</div>
                            <div className="ml-2 text-gray-800 bg-white px-3 w-1/2 text-right rounded-md">{patient['username']}</div>
                        </div>
                        <div className="my-2 flex justify-between bg-gray-200 w-full px-2 py-1 rounded-md">
                            <div>first name</div>
                            <div className="ml-2 text-gray-800 bg-white px-3 w-1/2 text-right rounded-md">{patient['firstName']}</div>
                        </div>
                        <div className="my-2 flex justify-between bg-gray-200 w-full px-2 py-1 rounded-md">
                            <div>last name</div>
                            <div className="ml-2 text-gray-800 bg-white px-3 w-1/2 text-right rounded-md">{patient['lastName']}</div>
                        </div>
                        <div className="my-2 flex justify-between bg-gray-200 w-full px-2 py-1 rounded-md">
                            <div>DoB</div>
                            <div className="ml-2 text-gray-800 bg-white px-3 text-right rounded-md">{patient['dob'].slice(0, 10)}</div>
                        </div>
                        {/* <div className="my-2 flex justify-between bg-gray-200 w-full px-2 py-1 rounded-md">
                            <div>connected</div>
                            <div className="ml-2 text-gray-800 bg-white px-3 w-1/2 text-right rounded-md">0</div>
                        </div> */}
                    </div>
                </div>
                <div className="flex justify-evenly bg-blue-100 w-1/2 rounded-lg mx-1">
                    <div className="text-center mt-4 mr-6 h-fit">
                        <div className="bg-blue-200 text-2xl p-5  rounded-lg text-gray-500 border-b border-gray-600">Reports Count</div>
                        <div className="text-8xl text-gray-500">{reportsCount}</div>
                    </div>
                    <div className="text-center mt-4 mr-6 h-fit">
                        <div className="bg-blue-200 text-2xl p-5  rounded-lg text-gray-500 border-b border-gray-600">Tests Count</div>
                        <div className="text-8xl text-gray-500">{testsCount}</div>
                    </div>
                </div> 
            </div>
            <div className="w-1/2 float-right mt-10 mr-2">
                <AppButton text={"Reports"} style={"link"}/>
                <AppButton text={"Tests"} style={"link"}/>
                <AppButton text={"Vitals"} style={"link"}/>
            </div>
        </div>
    )
}

export default PatientProfile