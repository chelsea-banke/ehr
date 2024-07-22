import "./login.css"
import AppButton from "../../shared/app-button/app-button"
import AppInput from "../../shared/app-input/app-input"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import login from "../../../services/login"
import { useDispatch } from "react-redux"
import { updateRole } from "../../../store/slices/roleSlice"
import { updateStats } from "../../../store/slices/statsSlice"
import { updateUser } from "../../../store/slices/userSlice"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const Login = ()=>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [centerId, setCenterId] = useState('')
    const [role, setRole] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitLogin = async (e)=>{
        e.preventDefault()
        await login({username, password, centerId, role}).then(response=>{
            if(response.success){
                toast.success(response.message, {
                    position: 'top-center'
                })
                dispatch(updateRole(response["data"]["staff"]["role"]))
                dispatch(updateStats(response["data"]["stats"]))
                dispatch(updateUser(response["data"]["staff"]))
                navigate("/verified/dashboard")
            }
            else{
                toast.error(response.message, {
                    position: 'top-center',
                })
            }
        })
    }

    return(
        <div className="w-screen">
            <div className="flex justify-center w-9/12 m-auto shadow-lg mt-40">
                <div className="bg-primary-green w-1/2 p-10 text-white font-semibold rounded-l-lg">
                    <p className="text-base">Your Health, Connected: Where Wellness <br /> Meets Technology. </p>
                    <img src="login2.svg" className="m-auto mt-10" alt="" />
                    <p className="text-base mt-10 text-right">Log into your health center today and <br /> enjoy the benefits of a decentralised health <br /> records system</p>
                    <div className="mt-4 w-1/2 float-right">
                        <AppButton style='link' text='learn more'/>
                    </div>
                </div>
                <form onSubmit={(e)=>{submitLogin(e)}} className="w-1/2 rounded-r-lg bg-pale-green p-8">
                    <h2 className="text-3xl font-medium text-gray-900">Login</h2>
                    <p className="text-gray-600 border-b border-primary-green">fill the form below to get in</p>
                    <div className="mt-10">
                        <AppInput label='username' placeholder='johndoe' type='text' required={true} value={setUsername}/>
                        <AppInput label='password' placeholder='*********' type='password' required={true} value={setPassword}/>
                        <div className="flex">
                            <AppInput label='center name' placeholder='clinic' type='text' required={true} fill={false} value={setCenterId}/>
                            <AppInput label='role' placeholder='clinic' type='text' required={true} value={setRole}/>
                        </div>
                    </div>
                    <div className="mt-10">
                        <AppButton type='submit' style="button" text='login'/>
                        <Link to={'/'}>
                            <AppButton type='button' style="cancel" text='cancel'/>
                        </Link>
                    </div>
                    {/* <p className="text-center mt-4 text-gray-600">already have a center ? <Link to="" className="font-semibold text-blue-500 underline">login</Link></p> */}
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Login