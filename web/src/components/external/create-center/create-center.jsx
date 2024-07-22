import "./create-center.css"
import AppButton from "../../shared/app-button/app-button"
import AppInput from "../../shared/app-input/app-input"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import requests from "../../../services/requests"
import { useDispatch } from "react-redux"
import { updateCenter } from "../../../store/slices/centerSlice"

const CreateCenter = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [centerData, setCenterData] = useState({
        "email": "",
        "name": "",
        "type": ""
    })
    
    const createCenter = async (e) => {
        e.preventDefault()
        await requests.postRequest('http://localhost:3000/ehr/root/create-center', centerData).then(response => {
            if(response['success']){
                dispatch(updateCenter(response['data']))
                navigate('/create-admin')
            }
        })
    }
    return(
        <div className="w-screen">
            <div className="flex justify-center w-9/12 m-auto shadow-lg mt-40">
                <div className="bg-primary-green w-1/2 p-10 text-white font-semibold rounded-l-lg">
                    <p className="text-base">Your Health, Connected: Where Wellness <br /> Meets Technology. </p>
                    <img src="create-center.svg" className="m-auto mt-10" alt="" />
                    <p className="text-base mt-10 text-right">Reigister your health center today and <br /> enjoy the benefits of a decentralised health <br /> records system</p>
                    <div className="mt-4 w-1/2 float-right">
                        <AppButton style='link' text='learn more'/>
                    </div>
                </div>
                <form className="w-1/2 rounded-r-lg bg-pale-green p-8" onSubmit={(e)=>{createCenter(e)}}>
                    <h2 className="text-3xl font-medium text-gray-900">Create Center</h2>
                    <p className="text-gray-600 border-b border-primary-green">fill the form below to get strated</p>
                    <div className="mt-10">
                        <AppInput label='center name' placeholder='healthcare...' type='text' required={true} value={(value)=>{setCenterData({...centerData, 'name': value})}} />
                        <AppInput label='center email' placeholder='healthcare@gmail.com' type='text' required={true} value={(value)=>{setCenterData({...centerData, 'email': value})}} />
                        <div className="flex">
                            <AppInput label='center type' placeholder='clinic' type='text' required={true} value={(value)=>{setCenterData({...centerData, 'type': value})}} />
                            <div className="w-3/4 bg-white border-dashed border-2 ml-2 mt-4 border-gray-500 rounded-lg flex justify-between text-gray-600 font-medium">
                                <div className="mt-3 ml-3 w-fit">
                                    <p className="">upload docs zip</p>
                                    <FontAwesomeIcon icon={'fa-solid fa-plus'} className="m-auto block" size="xl"/>
                                </div>
                                <div className="text-center w-1/2 mt-3 border-l border-gray-400">
                                    Drag & <br /> Drop
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <AppButton type='submit' style="button" text='create center'/>
                        <Link to={'/'}>
                            <AppButton type='button' style="cancel" text='cancel'/>
                        </Link>
                    </div>
                    <p className="text-center mt-4 text-gray-600">already have a center ? <Link to="/login" className="font-semibold text-blue-500 underline">login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default CreateCenter