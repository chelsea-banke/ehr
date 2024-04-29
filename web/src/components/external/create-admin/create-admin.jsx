import "./create-admin.css"
import AppButton from "../../shared/app-button/app-button"
import AppInput from "../../shared/app-input/app-input"
import { Link } from "react-router-dom"

const CreateAdmin = ()=>{
    return(
        <div className="w-screen">
            <div className="flex justify-center w-9/12 m-auto shadow-lg mt-20">
                <div className="bg-primary-green w-1/2 p-10 text-white font-semibold rounded-l-lg">
                    <p className="text-base">Your Health, Connected: Where Wellness <br/> Meets Technology. </p>
                    <img src="create-admin.svg" className="m-auto mt-10 create-admin-img" alt="" />
                    <p className="text-base mt-10 text-right">Reigister as an admin today and enjoy the <br /> benefits of a decentralised health <br /> records system</p>
                    <div className="mt-4 w-1/2 float-right">
                        <AppButton style='link' text='learn more'/>
                    </div>
                </div>
                <form className="w-1/2 rounded-r-lg bg-pale-green p-8">
                    <h2 className="text-3xl font-medium text-gray-900">Create Admin</h2>
                    <p className="text-gray-600 border-b border-primary-green">fill the form below to get strated</p>
                    <div className="mt-5">
                        <div className="flex w-full justify-between" >
                            <AppInput label='first name' placeholder='john' type='text' required={true} fill={false} />
                            <AppInput label='last name' placeholder='john' type='text' required={true}/>
                        </div>
                        <AppInput label='username' placeholder='admin' type='text' required={true} />
                        <div className="flex">
                            <AppInput label='password' placeholder='*********' type='password' required={true} fill={false}/>
                            <AppInput label='Consfirm password' placeholder='*********' type='password' required={true} />
                        </div>
                    </div>
                    <div className="mt-10 flex">
                        <AppButton type='button' style="cancel" text='cancel'/>
                        <AppButton type='button' style="button" text='create admin'/>
                    </div>
                    <p className="text-center mt-4 text-gray-600">already have an account ? <Link to="" className="font-semibold text-blue-500 underline">login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default CreateAdmin