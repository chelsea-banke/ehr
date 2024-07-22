import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons"
import db from "../../../assets/images/dashboard-barner.png"
import ellipse from "../../../assets/images/ellipse.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./dashboard.css"
import NeuralAnimation from "../../shared/neuralAnimation/neural-animation"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCenterStats } from "../../../store/slices/statsSlice"

const Dashboard = ()=>{

    const dispatch = useDispatch()
    const stats = useSelector(state => state.stats)
    const role = useSelector(state => state.role)
    const user = useSelector(state => state.user)

    useEffect(()=>{
        dispatch(fetchCenterStats({role: role, centerCenterId: user['centerCenterId']}))
    }, [])

    return(
        <div className="h-full flex justify-between">
            <div className="w-full">
                <div className="db-barner m-auto rounded-b-2xl overflow-hidden relative bg-blue-500">
                    <img className="absolute profile bottom-0 left-24 z-10 bg-gray-50 rounded-t-2xl p-2" src={ellipse} alt="" />
                    {/* <p className="absolute right-5 text-2xl font-medium border-2 border-t-0 border-white bg-blue-300 rounded-b-lg text-white px-5 py-2">Doctor John Doe</p> */}
                    {/* <img src={db} alt="" className="w-full" /> */}
                    <NeuralAnimation/>
                </div>
                <div className="mt-10 flex mx-28">
                    <div className="w-1/3 mr-5">
                        <h2 className="font-semibold text-violet-600 text-xl">Staffs</h2>
                        <div className="mt-2 flex border-4 border-violet-400 rounded-lg bg-violet-400">
                            <div className="px-8 py-6 border-r-2 w-fit rounded-lg bg-white">
                                <FontAwesomeIcon icon="fa-solid fa-user-doctor" size="3x" color="white" className="bg-violet-500 p-3 rounded-lg"/>
                                <p className="mt-3 border-b border-gray-400">Total Staffs</p>
                                <p className="mt-1 text-3xl font-semibold text-violet-600">{stats["staffsCount"]} +</p>
                            </div>
                            <div className="py-6 px-4 w-fit bg-violet-400 rounded-r-lg">
                                <div className="mt-1 px-6 text-3xl font-semibold text-white border-b-2 h-1/3">{stats["doctorsCount"]} + <span className="font-normahl text-lg block">doctors</span></div>
                                <div className="mt-3 px-6 text-3xl font-semibold text-white h-1/3  border-b-2">{stats["labTechsCount"]} + <span className="font-normahl text-lg block">lab-techs</span></div>
                                <div className="mt-3 px-6 text-3xl font-semibold text-white h-1/3">{stats["nursesCount"]} + <span className="font-normahl text-lg block">nurses</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 mr-5">
                        <h2 className="font-semibold text-red-600 text-xl">Patients</h2>
                        <div className="mt-2 flex border-4 border-red-400 rounded-lg bg-red-400">
                            <div className="px-8 py-6 border-r-2 w-fit rounded-lg bg-white">
                                <FontAwesomeIcon icon="fa-solid fa-wheelchair-move" size="3x" color="white" className="bg-red-500 p-3 rounded-lg"/>
                                <p className="mt-3 border-b border-gray-400">Total Patients</p>
                                <p className="mt-1 text-3xl font-semibold text-red-600">{stats["patientsCount"]} +</p>
                            </div>
                            <div className="py-6 px-4 w-fit bg-red-400 rounded-r-lg">
                                <div className="mt-1 px-6 text-3xl font-semibold text-white border-b-2 h-1/2">{stats["connectedPatientsCount"]} + <span className="font-normahl text-lg block">connected</span></div>
                                <div className="mt-3 px-6 text-3xl font-semibold text-white h-1/2">{stats["disconnectedPatientsCount"]} + <span className="font-normahl text-lg block">dis-connected</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 mr-5">
                        <h2 className="font-semibold text-green-600 text-xl">Reports</h2>
                        <div className="mt-2 flex border-4 border-green-400 rounded-lg bg-green-400">
                            <div className="px-8 py-6 border-r-2 w-fit rounded-lg bg-white">
                                <FontAwesomeIcon icon="fa-solid fa-file-lines" size="3x" color="white" className="bg-green-500 p-3 rounded-lg"/>
                                <p className="mt-3 border-b border-gray-400">Total Reports</p>
                                <p className="mt-1 text-3xl font-semibold text-green-600">{stats["reportsCount"]} +</p>
                            </div>
                            <div className="py-6 px-4 w-fit bg-green-400 rounded-r-lg">
                                <div className="mt-1 px-6 text-3xl font-semibold text-white border-b-2 h-1/2">{stats["testsCount"]} + <span className="font-normahl text-lg block">Lab Tests</span></div>
                                {/* <div className="mt-3 px-6 text-3xl font-semibold text-white h-1/2">100 + <span className="font-normahl text-lg block">dis-connected</span></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="h-full w-1/6 bg-pale-green border-l flex flex-col justify-evenly">
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
            </div> */}
        </div>
    )
}

export default Dashboard