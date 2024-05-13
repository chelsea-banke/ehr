import profileImage from "../../../assets/images/profile-image.png"
import AppButton from "../../shared/app-button/app-button"
import "./patient-profile.css"

const PatientProfile = ()=>{
    return(
        <div className="patient-profile mx-6">
            <div className="mt-16 flex justify-evenly border-b border-gray-500 pb-4">
                <div className="flex border-r pr-10 border-gray-500">
                    <img src={profileImage} className="profile-img" alt="" />
                    <div className="mx-10 text-xl text-gray-500">
                        <div className="my-2">patient id:
                            <span className="font-medium ml-2 text-gray-800">01</span>
                        </div>
                        <div className="my-2">usrname:
                            <span className="font-medium ml-2 text-gray-800">janedoe</span>
                        </div>
                        <div className="my-2">first name:
                            <span className="font-medium ml-2 text-gray-800">Jane</span>
                        </div>
                        <div className="my-2">last name:
                            <span className="font-medium ml-2 text-gray-800">Doe</span>
                        </div>
                        <div className="my-2">Connected:
                            <span className="font-medium ml-2 text-gray-800">01</span>
                        </div>
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
            <div className="w-1/2 float-right mt-10 mr-2">
                <AppButton text={"Reports"} style={"link"}/>
                <AppButton text={"Tests"} style={"link"}/>
                <AppButton text={"Vitals"} style={"link"}/>
            </div>
        </div>
    )
}

export default PatientProfile