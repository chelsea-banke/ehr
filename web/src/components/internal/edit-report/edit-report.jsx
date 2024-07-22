import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AppButton from "../../shared/app-button/app-button"
import "./edit-report.css"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import requests from "../../../services/requests"
import { updateReport } from "../../../store/slices/reportSlice"
import { useNavigate } from "react-router-dom"
import { fetchTests } from "../../../store/slices/testListSlice"
import { toast } from "react-toastify"
import { reloadStates } from "../../../services/reload"

const EditReport = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const report = (useSelector(state => state.report)).report
    const patient = useSelector(state => state.patient)
    const user = useSelector(state => state.user)
    const role = useSelector(state => state.role)

    const [diagnosis, setDiagnosis] = useState(report['diagnosis'])
    const [prescriptions, setPrescriptions] = useState(JSON.parse(report['prescriptions']))
    const [prescription, setPrescription] = useState({
        name: '',
        morning: '',
        noon: '',
        evening: '',
        type: ''
    })

    const [tests, setTests] = useState((useSelector(state => state.testsList).tests).filter(test=>test['reportReportId']==report['reportId']))
    const [newTests, setNewTests] = useState([])
    const [purgedTests, setPurgedTests] = useState([])

    const [test, setTest] = useState({
        name: '',
        description: ''
    })

    const addPrescription = (e)=>{
        e.preventDefault()
        setPrescriptions(()=>[...prescriptions, prescription])
        setPrescription({
            name: '',
            morning: '',
            noon: '',
            evening: '',
            type: ''
        })
    }

    const saveUpdate = async ()=>{
        await requests.getRequest(`http://localhost:3000/ehr/staff/${role}/test-connection?patientUsername=${patient['username']}&centerCenterId=${user['centerCenterId']}`).then(async response=>{
            if(response.success && response.connected){
                await requests.postRequest('http://localhost:3000/ehr/doctor/update-report', {
                    'reportId': report['reportId'],
                    'patientUsername': patient['username'],
                    'data': {
                        'diagnosis': diagnosis,
                        'prescriptions': JSON.stringify(prescriptions)
                    }
                }).then(async response => {
                    if(response.success){
                        toast.success(response.message)
                        await dispatch(updateReport(response.data))
                        await requests.postRequest('http://localhost:3000/ehr/doctor/create-tests', newTests).then(async response=>{
                            await requests.deleteRequest('http://localhost:3000/ehr/doctor/delete-tests', purgedTests).then(async response=>{
                                await dispatch(fetchTests({role: role, patientUsername: patient['username']}))
                                await reloadStates()
                                navigate(`/verified/patients/:${patient['username']}/reports/:${report['reportId']}`)
                            })
                        })
                    }
                })
            }
            else{
                toast.error(response.message)
                reloadStates()
            }
        })
    }

    const addTest = async (e)=>{
        e.preventDefault()
        console.log(test);
        setNewTests([...newTests, {
            'patientUsername': patient['username'],
            'testName': test['name'],
            'description': test['description'],
            'doctorUsername': user['username'],
            'doctorCenterCenterId': user['centerCenterId'],
            'reportReportId': report['reportId'],
            'dateCreated': new Date().toISOString()
        }])
        setTest({
            name: '',
            description: ''
        })
    }

    return(
        <div className="create-new-report">
            <div className="sticky pt-6 top-0 bg-gray-50 mx-6 border-b border-gray-400">
                <div className="flex justify-between">
                    <div className="font-medium text-gray-500 border-b border-gray-400 pb-2 flex justify-start">
                        <div className="w-fit">
                            <div>report id: 
                                <span className="ml-3 text-gray-900">{report['reportId']}</span>
                            </div>
                            <div>date created: 
                                <span className="ml-3 text-gray-900">{report['dateCreated'].slice(0, 10)}</span>
                            </div>
                        </div>
                        <div className="w-fit mx-20">
                            <div>doctor: 
                                <span className="ml-3 text-gray-900">{report['doctorUsername']}</span>
                            </div>
                            <div>health center: 
                                <span className="ml-3 text-gray-900">{report['doctorCenterCenterId']}</span>
                            </div>
                        </div>
                        <div className="">
                            <div>test count: 
                                <span className="ml-3 text-gray-900">0</span>
                            </div>
                            <div>prescriptions count: 
                                <span className="ml-3 text-gray-900">0</span>
                            </div>
                        </div>
                    </div>
                    <div className="ml-6 w-1/3 h-fit flex justify-evenly">
                        <AppButton text={"Cancel"} style={"cancel"} handleClick={async ()=>{
                            await reloadStates();
                            navigate(`/verified/patients/:${patient['username']}/reports/:${report['reportId']}`)
                        }}/>
                        <div className="mx-1"></div>
                        <AppButton text={"save update"} style={"button"} handleClick={()=>{saveUpdate()}}/>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex">
                        <div>
                            <label htmlFor="" className="block text-lg">Diagnosis</label>
                            <textarea name="" id="" cols="60" rows="7" className="mt-2 border border-gray-400 rounded-lg p-2" onChange={(e)=>{setDiagnosis(e.target.value)}}>{diagnosis}</textarea>
                        </div>
                        <div className="w-full ml-4">
                            <form onSubmit={(e)=>{addPrescription(e)}}>
                                <div className="flex justify-between w-full text-center">
                                    <input required type="text" className="block border-b border-gray-400 bg-gray-50 px-2" placeholder="prescription" value={prescription['name']} onChange={(e)=>{setPrescription({...prescription, name: e.target.value})}}/>
                                    <div className="dosage-input">
                                        <input required type="number" className="text-center bg-gray-50 border-b border-gray-400" placeholder="0" value={prescription['morning']} onChange={(e)=>{setPrescription({...prescription, morning: e.target.value})}}/>
                                        <label required className="block" htmlFor="">morning</label>
                                    </div>
                                    <div className="dosage-input">
                                        <input required type="number"  className=" text-center bg-gray-50 border-b border-gray-400" placeholder="0" value={prescription['noon']} onChange={(e)=>{setPrescription({...prescription, noon: e.target.value})}}/>
                                        <label required className="block" htmlFor="">afternoon</label>
                                    </div>
                                    <div className="dosage-input">
                                        <input required type="number"  className=" text-center bg-gray-50 border-b border-gray-400" placeholder="0" value={prescription['evening']} onChange={(e)=>{setPrescription({...prescription, evening: e.target.value})}}/>
                                        <label className="block" htmlFor="">evening</label>
                                    </div>
                                </div>
                                <div className="flex">
                                    <select required className="p-2 rounded-md h-fit mt-3 mx-2" value={prescription['type']} onChange={(e)=>{setPrescription({...prescription, type: e.target.value})}}>
                                        <option value="tablet">tablet</option>
                                        <option value="pills">pills</option>
                                        <option value="teaspoon">teaspoons</option>
                                        <option value="ml">ml</option>
                                        <option value="cl">cl</option>
                                    </select>
                                    <AppButton type={'submit'} text={'add prescription +'} style={"link2"}/>
                                </div>
                            </form>
                            <form className="mt-10 flex" onSubmit={(e)=>{addTest(e)}}>
                                <div className="">
                                    <input required type="text" className="block border-b border-gray-400 bg-gray-50 px-2" placeholder="test name" value={test['name']} onChange={(e)=>{setTest({...test, name: e.target.value})}}/>
                                    <AppButton type={'submit'} text={'add test +'} style={"link2"}/>
                                </div>
                                <textarea required type="text" className="block border border-gray-400 p-2 w-full ml-5 rounded-lg" placeholder="test description" value={test['description']} onChange={(e)=>{setTest({...test, description: e.target.value})}}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-6 mt-8 flex justify-between">
                <div className="diagnosis border-l pl-2 border-gray-400 w-1/2 bg-gray-100 rounded-lg">
                    {prescriptions.map(pres=>{
                        return(
                            <div className="w-full border-l border-b border-gray-400 mb-5">
                                <div className="p-3 pb-2">
                                    <h4 className="text-lg text-primary-green bg-white w-fit px-2 pt-1 rounded-t">{pres['name']}<span className="ml-2 text-blue-500">( {pres['type']} )</span></h4>
                                    <div className="w-full flex justify-between">
                                        <div className="flex w-full justify-between text-center bg-white px-4 py-4 rounded-lg rounded-tl-none">
                                            <div className="bg-gray-100 rounded w-1/3">
                                                <div className="bg-gray-200 py-2 px-4">morning</div>
                                                <div className="text-xl font-medium py-2">{pres['morning']}</div>
                                            </div>
                                            <div className="bg-gray-100 rounded w-1/3 mx-4">
                                                <div className="bg-gray-200 py-2 px-4">afternoon</div>
                                                <div className="text-xl font-medium py-2">{pres['noon']}</div>
                                            </div>
                                            <div className="bg-gray-100 rounded w-1/3">
                                                <div className="bg-gray-200 py-2 px-4">evening</div>
                                                <div className="text-xl font-medium py-2">{pres['evening']}</div>
                                            </div>
                                        </div>
                                        <button className="w-fit mx-4 ml-6 mt-7" onClick={()=>{setPrescriptions(()=>prescriptions.filter(presTest => presTest !== pres))}}>
                                                <FontAwesomeIcon icon="fa-solid fa-trash-can" size="lg"/>
                                        </button>
                                    </div>
                                </div>
                            </div>     
                        )
                    })}
                </div>
                <div className="w-1/2 h-full bg-gray-100 py-1">
                        {newTests.map(test=>{
                            return(
                                <div className="p-4 mx-2 bg-white rounded-md my-4">
                                    <h4 className="text-lg text-primary-green">Malaria</h4>
                                    <div className="flex justify-between">                   
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aliquid ipsum. Iste esse, id nobis quo maiores laudantium. Quisquam velit suscipit error atque rem nisi non. Nemo quisquam repellendus dolor!</p>
                                        <button className="mt-14" onClick={()=>{setNewTests(()=>newTests.filter(newTest => newTest !== test))}}>
                                            <FontAwesomeIcon icon="fa-solid fa-trash-can" size="lg"/>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                        {tests.map(test=>{
                            return(
                                <div className="p-4 mx-2 bg-white rounded-md my-4">
                                    <h4 className="text-lg text-primary-green">Malaria</h4>
                                    <div className="flex justify-between">                   
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aliquid ipsum. Iste esse, id nobis quo maiores laudantium. Quisquam velit suscipit error atque rem nisi non. Nemo quisquam repellendus dolor!</p>
                                        <button className="mt-14"  onClick={()=>{
                                                setPurgedTests([...purgedTests, test['testId']])
                                                setTests(()=>tests.filter(t => t !== test))}
                                            }>
                                            <FontAwesomeIcon icon="fa-solid fa-trash-can" size="lg"/>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </div>
        </div>
    )
}

export default EditReport