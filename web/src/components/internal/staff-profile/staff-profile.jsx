import { useDispatch, useSelector } from "react-redux"
import profileImage from "../../../assets/images/profile-image.png"
import AppButton from "../../shared/app-button/app-button"
import AppInput from "../../shared/app-input/app-input"
import { fetchReports } from "../../../store/slices/reportListSlice";
import { fetchTests } from "../../../store/slices/testListSlice"
import "./staff-profile.css"
import { useEffect } from "react";

const StaffProfile = ()=>{
    const dispatch = useDispatch()
    const staff = useSelector(state => state.staff)

    const reportsCount = (useSelector(state => state.reportsList)).reports.length
    const testsCount = (useSelector(state => state.testsList)).tests.length
    const role = useSelector(state => state.role)
    
    useEffect(()=>{
        console.log('fetching..');
        dispatch(fetchReports({role: role, doctorUsername: staff['username']}))
        dispatch(fetchTests({role: role, doctorUsername: staff['username']}))
    }, [])

    return(
        <div className="patient-profile mx-6">
            <div className="mt-16 flex justify-evenly border-b border-gray-500 pb-4">
                <div className="flex border-r pr-10 border-gray-500 w-1/2">
                    <img src={profileImage} className="profile-img" alt="" />
                    <div className="mx-10 text-base text-gray-500 w-full">
                        <div className="my-2 flex justify-between bg-gray-200 w-full px-2 py-1 rounded-md">
                            <div>username</div>
                            <div className="ml-2 text-gray-800 bg-white px-3 w-1/2 text-right rounded-md">{staff['username']}</div>
                        </div>
                        <div className="my-2 flex justify-between bg-gray-200 w-full px-2 py-1 rounded-md">
                            <div>first name</div>
                            <div className="ml-2 text-gray-800 bg-white px-3 w-1/2 text-right rounded-md">{staff['firstName']}</div>
                        </div>                    
                        <div className="my-2 flex justify-between bg-gray-200 w-full px-2 py-1 rounded-md">
                            <div>last name</div>
                            <div className="ml-2 text-gray-800 bg-white px-3 w-1/2 text-right rounded-md">{staff['lastName']}</div>
                        </div>
                        <div className="my-2 flex justify-between bg-gray-200 w-full px-2 py-1 rounded-md">
                            <div>role</div>
                            <div className="ml-2 text-gray-800 bg-white px-3 w-1/2 text-right rounded-md">{staff['role']}</div>
                        </div>
                        <div className="my-2 flex justify-between bg-gray-200 w-full px-2 py-1 rounded-md">
                            <div>status</div>
                            <div className="ml-2 text-gray-800 bg-white px-3 w-1/2 text-right rounded-md">{staff['status']}</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-evenly bg-blue-100 w-5/12 rounded-lg mx-1">
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
            <div className="flex w-full mt-10">
                {/* <div className="w-1/2">
                    <AppButton text={"Reports"} style={"link2"}/>
                    <AppButton text={"Tests"} style={"link2"}/>
                    <AppButton text={"Vitals"} style={"link2"}/>
                </div> */}
                <div className="w-1/2 ml-6">
                    {/* <h3 className="ml-4 text-lg font-semibold text-primary-green">Edit Profile</h3> */}
                    <div className="bg-gray-100 p-4 mt-2 rounded-lg bordjer border-primary-green">
                        <div className="flex w-full justify-between">
                            <AppInput label={"first name"} placeholder={"Joh"} fill={false} style="bg-gray-50"/>
                            <AppInput label={"last name"} placeholder={"Doe"}  style="bg-gray-50"/>
                        </div>
                        <div className="w-full flex justify-between">
                            <AppInput label={"role"} placeholder={"Doctor"} fill={false}  style="bg-gray-50"/>
                            <AppInput label={"status"} placeholder={"active"}  style="bg-gray-50"/>
                        </div>
                        <AppInput label={"password"} placeholder={""}  style="bg-gray-50"/><br/>
                        <AppButton text={"save"} style={"button"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffProfile