import "./create-admin.css"
import AppButton from "../../shared/app-button/app-button"
import AppInput from "../../shared/app-input/app-input"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import requests from "../../../services/requests"

const CreateAdmin = ()=>{
    const navigate = useNavigate()
    const center = useSelector(state => state.center)
    const [adminData, setAdminData] = useState({
        "username": "",
        "firstName": "",
        "lastName": "",
        "role": "admin",
        "password": "",
        "centerCenterId": ''
    })
    const [passwordCheck, setPasswordCheck] = useState('')

    const createAdmin = async (e) => {
        e.preventDefault()
        if(center['centerId'] == adminData['centerCenterId']){
            if(adminData['password'] == passwordCheck){
                await requests.postRequest('http://localhost:3000/ehr/root/create-admin', adminData).then(response => {
                    if (response['success']) {
                        console.log(response['data']);
                        navigate('/login')
                    }
                })
            }
            else{console.log('not matching password');}
        }
        else{console.log('invalid center id');}
    }

    return(
        <div className="w-screen">
            <div className="flex justify-center w-9/12 m-auto shadow-lg mt-40">
                <div className="bg-primary-green w-1/2 p-10 text-white font-semibold rounded-l-lg">
                    <p className="text-base">Your Health, Connected: Where Wellness <br/> Meets Technology. </p>
                    <img src="create-admin.svg" className="m-auto mt-10 create-admin-img" alt="" />
                    <p className="text-base mt-10 text-right">Reigister as an admin today and enjoy the <br /> benefits of a decentralised health <br /> records system</p>
                    <div className="mt-4 w-1/2 float-right">
                        <AppButton style='link' text='learn more'/>
                    </div>
                </div>
                <form className="w-1/2 rounded-r-lg bg-pale-green p-8" onSubmit={(e)=>{createAdmin(e)}}>
                    <h2 className="text-3xl font-medium text-gray-900">Create Admin</h2>
                    <p className="text-gray-600 border-b border-primary-green mt-2">Complete setup for <span className="text-primary-green font-medium text-lg bg-white px-4 border border-gray-500 py-1">{center['name']}</span> </p>
                    <div className="mt-5">
                        <div className="flex">
                            <AppInput label='Center ID' placeholder='XXXX' type='text' required={true} fill={false} value={(value)=>{setAdminData({...adminData, 'centerCenterId': value})}} />
                            <AppInput label='username' placeholder='admin' type='text' required={true} value={(value)=>{setAdminData({...adminData, 'username': value})}} />
                        </div>
                        <div className="flex w-full justify-between" >
                            <AppInput label='first name' placeholder='john' type='text' required={true} fill={false} value={(value)=>{setAdminData({...adminData, 'firstName': value})}} />
                            <AppInput label='last name' placeholder='john' type='text' required={true}  value={(value)=>{setAdminData({...adminData, 'lastName': value})}}/>
                        </div>
                        <div className="flex">
                            <AppInput label='password' placeholder='*********' type='password' required={true} fill={false} value={(value)=>{setAdminData({...adminData, 'password': value})}} />
                            <AppInput label='Confirm password' placeholder='*********' type='password' required={true} value={setPasswordCheck}/>
                        </div>
                    </div>
                    <div className="mt-10 flex">
                        <AppButton type='button' style="cancel" text='cancel'/>
                        <div className="mr-2"></div>
                        <AppButton type='submit' style="button" text='create admin'/>
                    </div>
                    <p className="text-center mt-4 text-gray-600">already have an account ? <Link to="" className="font-semibold text-blue-500 underline">login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default CreateAdmin