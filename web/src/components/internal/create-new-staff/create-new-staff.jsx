import { useState } from "react"
import AppButton from "../../shared/app-button/app-button"
import AppInput from "../../shared/app-input/app-input"
import { useNavigate } from "react-router-dom"
import requests from "../../../services/requests"
import { useDispatch, useSelector } from "react-redux"
import { updateStaff } from "../../../store/slices/staffSlice"
import { updateReportList } from "../../../store/slices/reportListSlice"
import { updateTestList } from "../../../store/slices/testListSlice"
import axios from "axios"
import { fetchStaffs } from "../../../store/slices/staffsListSlice"

const CreateNewStaff = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [staff, setStaff] = useState({
        'username': '',
        'firstName': '',
        'lastName': '',
        'role': '',
        'status': '',
        'password': '',
        'centerCenterId': ''
    })
    const [passwordCheck, setPasswordCheck] = useState('')

    const createStaff = async (e) => {
        e.preventDefault()
        staff['centerCenterId'] = user['centerCenterId']
        if(staff['password'] == passwordCheck){
            await requests.postRequest('http://localhost:3000/ehr/admin/create-staff', staff).then(async response=>{
                if(response['success']){
                    await dispatch(updateStaff(response['data']))
                    await dispatch(updateReportList([]))
                    await dispatch(updateTestList([]))
                    navigate(`/verified/staffs/:${response['data']['username']}/profile`)
                    await dispatch(fetchStaffs(user['centerCenterId']))
                }
                else{
                    console.log(response);
                }
            })
        }
    }

    return(
        <div className="w-10/12">
            <form className="w-4/6 rounded-lg bg-gray-100 p-8 m-auto mt-20 shadow-2xl" onSubmit={async (e) => createStaff(e)}>
                <h2 className="text-3xl font-medium text-gray-900">Create Staff</h2>
                <p className="text-gray-600 border-b border-primary-green">fill the form below to create staff</p>
                <div className="mt-5">
                <AppInput style='border-0 border-b bg-gray-50' label='username' placeholder='johndoe' type='text' required={false} value={(value) => setStaff({...staff, 'username': value})} />
                    <div className="flex w-full justify-between" >
                        <AppInput style='border-0 border-b bg-gray-50' label='first name' placeholder='john' type='text' required={false} fill={false}  value={(value) => setStaff({...staff, 'firstName': value})}/>
                        <AppInput style='border-0 border-b bg-gray-50' label='last name' placeholder='john' type='text' required={false} value={(value) => setStaff({...staff, 'lastName': value})}/>
                    </div>
                    <div className="w-full flex justify-between">
                            <AppInput style='border-0 border-b bg-gray-50' label={"role"} placeholder={"Doctor"} fill={false} required={false} value={(value) => setStaff({...staff, 'role': value})}/>
                            <AppInput style='border-0 border-b bg-gray-50' label={"status"} placeholder={"active"} required={false} value={(value) => setStaff({...staff, 'status': value})}/>
                        </div>
                    <div className="flex">
                        <AppInput style='border-0 border-b bg-gray-50' label='password' placeholder='*********' type='password' required={false} fill={false} value={(value) => setStaff({...staff, 'password': value})}/>
                        <AppInput style='border-0 border-b bg-gray-50' label='confirm password' placeholder='*********' type='password' required={false} value={setPasswordCheck} />
                    </div>
                </div>
                <div className="mt-10">
                    <AppButton type='button' style="cancel" text='cancel' handleClick={()=>{navigate(-1)}}/>
                    <AppButton type='submit' style="button" text='create staff'/>
                </div>
            </form>
        </div>
    )
}

export default CreateNewStaff