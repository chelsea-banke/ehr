import "./create-center.css"
import AppButton from "../../shared/app-button/app-button"
import AppInput from "../../shared/app-input/app-input"
import { Link } from "react-router-dom"

const CreateCenter = ()=>{
    return(
        <div className="w-screen">
            <div className="flex justify-center w-9/12 m-auto shadow-lg mt-20">
                <div className="bg-primary-green w-1/2 p-10 text-white font-semibold rounded-l-lg">
                    <p className="text-base">Your Health, Connected: Where Wellness <br /> Meets Technology. </p>
                    <img src="create-center.svg" className="m-auto mt-10" alt="" />
                    <p className="text-base mt-10 text-right">Reigister your health center today and <br /> enjoy the benefits of a decentralised health <br /> records system</p>
                    <div className="mt-4 w-1/2 float-right">
                        <AppButton style='link' text='learn more'/>
                    </div>
                </div>
                <form className="w-1/2 rounded-r-lg bg-pale-green p-8">
                    <h2 className="text-3xl font-medium text-gray-900">Create Center</h2>
                    <p className="text-gray-600 border-b border-primary-green">fill the form below to get strated</p>
                    <div className="mt-10">
                        <AppInput label='center name' placeholder='healthcare...' type='text' required={true} />
                        <AppInput label='center email' placeholder='healthcare@gmail.com' type='text' required={true} />
                        <AppInput label='center type' placeholder='clinic' type='text' required={true} />
                    </div>
                    <div className="mt-10">
                        <AppButton type='button' style="button" text='create center'/>
                        <AppButton type='button' style="cancel" text='cancel'/>
                    </div>
                    <p className="text-center mt-4 text-gray-600">already have a center ? <Link to="" className="font-semibold text-blue-500 underline">login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default CreateCenter