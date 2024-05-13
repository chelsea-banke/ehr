import profileImage from "../../../assets/images/profile-image.png"
import AppButton from "../../shared/app-button/app-button"
import AppInput from "../../shared/app-input/app-input"
import "./staff-profile.css"

const StaffProfile = ()=>{
    return(
        <div className="patient-profile mx-6">
            <div className="mt-16 flex justify-evenly border-b border-gray-500 pb-4">
                <div className="flex border-r pr-10 border-gray-500">
                    <img src={profileImage} className="profile-img" alt="" />
                    <div>
                        <div className="flex">
                            <div className="mx-10 text-xl text-gray-500">
                                <div className="my-2">staff id:
                                    <span className="font-medium ml-2 text-gray-800">01</span>
                                </div>
                                <div className="my-2">username:
                                    <span className="font-medium ml-2 text-gray-800">janedoe</span>
                                </div>
                                <div className="my-2">first name:
                                    <span className="font-medium ml-2 text-gray-800">Jane</span>
                                </div>
                            </div>
                            <div className="mx-5 text-xl text-gray-500">
                                <div className="my-2">last name:
                                    <span className="font-medium ml-2 text-gray-800">Doe</span>
                                </div>
                                <div className="my-2">role:
                                    <span className="font-medium ml-2 text-gray-800">doctor</span>
                                </div>
                                <div className="my-2">status:
                                    <span className="font-medium ml-2 text-gray-800">active</span>
                                </div>
                            </div>
                        </div>
                        {/* <div className="m-auto w-full ml-6 mt-7">
                            <AppButton text={"Edit profile"} style={"link"}/>
                        </div> */}
                    </div>
                </div>
                <div className="text-center mt-4 mx-6">
                    <div className="text-2xl text-gray-500">Reports Count</div>
                    <div className="text-8xl">02</div>
                </div>
                <div className="text-center mt-4 mx-6">
                    <div className="text-2xl text-gray-500">Tests Count</div>
                    <div className="text-8xl">02</div>
                </div>
            </div>
            <div className="flex w-full mt-10">
                <div className="w-1/2">
                    <AppButton text={"Reports"} style={"link2"}/>
                    <AppButton text={"Tests"} style={"link2"}/>
                    <AppButton text={"Vitals"} style={"link2"}/>
                </div>
                <div className="w-1/2 ml-4 bg-white p-4 mt-2 rounded-lg border">
                    <div className="flex w-full justify-between">
                        <AppInput label={"first name"} placeholder={"Joh"} fill={false}/>
                        <AppInput label={"last name"} placeholder={"Doe"}/>
                    </div>
                    <div className="w-full flex justify-between">
                        <AppInput label={"username"} placeholder={"johndoe"}/>
                        <AppInput label={"role"} placeholder={"Doctor"}/>
                    </div>
                    <AppInput label={"password"} placeholder={""}/><br/>
                    <AppButton text={"save"} style={"button"}/>
                </div>
            </div>
        </div>
    )
}

export default StaffProfile