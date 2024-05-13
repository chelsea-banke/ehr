import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons"
import db from "../../../assets/images/dashboard-barner.png"
import ellipse from "../../../assets/images/ellipse.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./dashboard.css"
import NeuralAnimation from "../../shared/neuralAnimation/neural-animation"

const Dashboard = ()=>{

    return(
        <div className="h-full flex justify-between">
            <div className="w-full mt-5 mx-28">
                <div className="db-barner m-auto rounded-2xl overflow-hidden relative bg-blue-500">
                    <img className="absolute profile mt-4 left-3 z-10" src={ellipse} alt="" />
                    <p className="absolute right-5 text-2xl font-medium border-2 border-t-0 border-white bg-blue-300 rounded-b-lg text-white px-5 py-2">Doctor John Doe</p>
                    {/* <img src={db} alt="" className="w-full" /> */}
                    <NeuralAnimation/>
                </div>
                <div className="mt-10">
                    <div>
                        <h2 className="font-medium">Patients</h2>
                        <div className="px-8 py-6 border-2 w-fit rounded-lg mt-2">
                            <FontAwesomeIcon icon="fa-solid fa-wheelchair-move" size="3x" color="white" className="bg-blue-500 p-3 rounded-lg"/>
                            <p className="mt-3 border-b border-gray-400">Total Patients</p>
                            <p className="mt-1 text-3xl font-semibold text-blue-600">200 +</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full w-1/6 bg-pale-green border-l flex flex-col justify-evenly">
                <button className="block mx-auto">
                    <FontAwesomeIcon icon={['fas', 'file-circle-plus']} size="5x" color="#858C94" className="m-auto block"/>
                    <p className="text-sm font-medium mt-1">Add Doctor</p>
                </button>
                <button className="block mx-auto">
                    <FontAwesomeIcon icon={['fas', 'file-circle-plus']} size="5x" color="#858C94" className="m-auto block"/>
                    <p className="text-sm font-medium mt-1">Add Nurse</p>
                </button>
                <button className="block mx-auto">
                    <FontAwesomeIcon icon={['fas', 'file-circle-plus']} size="5x" color="#858C94" className="m-auto block"/>
                    <p className="text-sm font-medium mt-1">Add LabTech</p>
                </button>
            </div>
        </div>
    )
}

export default Dashboard