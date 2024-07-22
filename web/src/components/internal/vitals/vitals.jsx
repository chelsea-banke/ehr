import { useEffect, useRef, useState } from "react"
import AppButton from "../../shared/app-button/app-button"
import { Line } from "react-chartjs-2"
import 'chart.js/auto';
import { useDispatch, useSelector } from "react-redux";
import { fetchVitals } from "../../../store/slices/vitalsSlice";
import requests from "../../../services/requests";
import './vitals.css'

function formatDate (dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", 
                        "jul", "aug", "sep", "oct", "nov", "dec"];
    const month = monthNames[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}-${month} ${hours}:${minutes}`;
}

function formatHistory (property, data){
    const keys = []
    const values = []
    JSON.parse(data).map(obj => {
        for(let key in obj){
            keys.push(formatDate(key))
            values.push(obj[key])
        }
    })
    return {
        labels: keys,
        datasets: [
            {
                label: property,
                data: values,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },  
        ]
    }
}

const Vitals = ()=>{
    const ref = useRef()
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('fetching...');
        dispatch(fetchVitals({role: role, patientUsername: patient['username']}))
    }, [])
    
    const patient = useSelector(state => state.patient)
    const vitals = (useSelector(state => state.vitals)).vitals
    const role = useSelector(state => state.role)

    const temperatureHistory = formatHistory('temperature', vitals['temperature'])
    const pulseRateHistory = formatHistory('pulse rate', vitals['pulseRate'])
    const bloodPressureHistory = formatHistory('blood pressure', vitals['bloodPressure'])
    const weightHistory = formatHistory('weight', vitals['weight'])
    const heightHistory = formatHistory('height', vitals['height'])

    const [temperature, setTemperature] = useState((temperatureHistory.datasets)[0].data[-1])
    const [pulseRate, setPulseRate] = useState((pulseRateHistory.datasets)[0].data[-1])
    const [bloodPressure, setBloodPressure] = useState((bloodPressureHistory.datasets)[0].data[-1])
    const [weight, setWeight] = useState((weightHistory.datasets)[0].data[-1])
    const [height, setHeight] = useState((heightHistory.datasets)[0].data[-1])

    const options = {
        interaction: {
            mode: 'index',
            intersect: false,
        }
    }
    
    const data = {
        labels: [],
        datasets: [
            {
                label: "First dataset",
                data: [],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },  
        ]
    }


    const updateVitals = async (e, property, value)=>{
        e.preventDefault()
        console.log(vitals);
        const date = new Date().toISOString()
        const vital = JSON.parse(vitals[property])
        vital.push({[date]: value})

        await requests.postRequest('http://localhost:3000/ehr/doctor/update-vitals', {
            'patientUsername': patient['username'],
            'data': {[property]: JSON.stringify(vital)}}).then(async reponse=>{
                if(reponse.success){
                    const results = await dispatch(fetchVitals({role: role, patientUsername: patient['username']})).unwrap()
                    switch (property) {
                        case 'temperature':
                            setTemperature('')
                            break;
                        case 'pulseRate':
                            setPulseRate('')
                            break;
                        case 'bloodPressure':
                            setBloodPressure('')
                            break;
                        case 'weight':
                            setWeight('')
                            break;
                        case 'height':
                            setHeight('')
                            break;
                        default:
                            break;
                    }
                }
            }
        )
    }

    return(
        <div className="px-6 pb-20 vitals">
            <div className="flex w-full py-4 px-2 bg-white border border-t-0 border-gray-300 rounded-b-lg justify-start sticky top-0">
                {[[temperatureHistory, '°c'], [pulseRateHistory, 'bpm'], [bloodPressureHistory, 'bpm'], [weightHistory, 'kg']].map(vitalHistory=>{
                    return(
                        <div className="bg-gray-100 w-fit mx-4">
                            <div className="bg-gray-200 py-2 px-4">{vitalHistory[0].datasets[0].label}</div>
                            <div className="flex px-4 w-full justify-between">
                                <div className=" py-2">{vitalHistory[0].labels.slice(-1)}</div>
                                <div className="text-2xl font-medium py-2 ml-5">{vitalHistory[0].datasets[0].data.slice(-1)} <span className="text-xl">{vitalHistory[1]}</span></div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="mt-10 flex justify-between border-b pb-4 border-gray-300 bg-violet-100 p-4 rounded-lg">
                {role == 'doctor' || role == 'nurse' ?
                    <div>
                        <div className="flex justify-between bg-violet-200 pl-2 rounded-lg">
                            <div>
                                <h3 className="text-4xl mt-5 text-violet-500 font-medium border-b border-gray-500">Temperature</h3>
                                <div className="text-sm font-medium text-gray-500 w-full text-right">({temperatureHistory.labels.slice(-1)})</div>
                            </div>
                            <div className="text-5xl text-violet-800 font-medium bg-violet-300 w-fit rounded-lg ml-4 h-fit px-4 py-2 my-4">
                                {temperatureHistory.datasets[0].data.slice(-1)}&deg;<span className="text-xl">c</span>
                            </div>
                        </div>
                        <form className="w-full flex justify-between h-fit mt-4" onSubmit={(e)=>{updateVitals(e, 'temperature', temperature)}}>
                            <input step={'any'} required type="number" inputMode="numeric" className="w-1/2 bg- border-gray-400 patients-search text-center pr-4 rounded-l-lg" placeholder="new temperature" value={temperature} onChange={(e)=>{setTemperature(e.target.value)}}/>
                            <button type="submit" className="block bg-violet-200 text-violet-800 border border-l-0 border-violet-800 w-1/2 px-4 py-2 font-semibold text-lg rounded-r-full">update</button>
                        </form>
                    </div>
                :<></>}
                <div className={`${role == 'doctor' || role == 'nurse' ? 'w-8/12' : 'w-full'} h-full`}>
                    <Line ref={ref} data={temperatureHistory} width={"100%"} height={"20px"} options={options} />
                </div>
            </div>

            <div className="mt-10 flex justify-between border-b pb-4 border-gray-300 bg-blue-100 p-4 rounded-lg">
                {role == 'doctor' || role == 'nurse' ?
                    <div>
                        <div className="flex justify-between bg-blue-200 pl-2 rounded-lg">
                            <div>
                                <h3 className="text-4xl mt-5 text-blue-500 font-medium border-b border-gray-500">Pulse-rate</h3>
                                <div className="text-sm font-medium text-gray-500 w-full text-right">({pulseRateHistory.labels.slice(-1)})</div>
                            </div>
                            <div className="text-5xl text-blue-800 font-medium bg-blue-300 w-fit rounded-lg ml-4 h-fit px-4 py-2 my-4">
                                {pulseRateHistory.datasets[0].data.slice(-1)}&deg;<span className="text-xl">bps</span>
                            </div>
                        </div>
                        <form className="w-full flex justify-between h-fit mt-4" onSubmit={(e)=>{updateVitals(e, 'pulseRate', pulseRate)}}>
                            <input step={'any'} required type="number" inputMode="numeric" className="w-1/2 bg- border-gray-400 patients-search text-center pr-4 rounded-l-lg" placeholder="new pulse" value={pulseRate} onChange={(e)=>{setPulseRate(e.target.value)}}/>
                            <button type="submit" className="block bg-blue-200 text-blue-800 border border-l-0 border-blue-800 w-1/2 px-4 py-2 font-semibold text-lg rounded-r-full">update</button>
                        </form>
                    </div>
                :<></>}
                <div className={`${role == 'doctor' || role == 'nurse' ? 'w-8/12' : 'w-full'} h-full`}>
                    <Line ref={ref} data={pulseRateHistory} width={"100%"} height={"20px"} options={options} />
                </div>
            </div>

            <div className="mt-10 flex justify-between border-b pb-4 border-gray-300 bg-red-100 p-4 rounded-lg">
                {role == 'doctor' || role == 'nurse' ?
                    <div>
                        <div className="flex justify-between bg-red-200 pl-2 rounded-lg">
                            <div>
                                <h3 className="text-4xl mt-5 text-red-500 font-medium border-b border-gray-500">blood pressure</h3>
                                <div className="text-sm font-medium text-gray-500 w-full text-right">({bloodPressureHistory.labels.slice(-1)})</div>
                            </div>
                            <div className="text-5xl text-red-800 font-medium bg-red-300 w-fit rounded-lg ml-4 h-fit px-4 py-2 my-4">
                                {bloodPressureHistory.datasets[0].data.slice(-1)}&deg;<span className="text-xl">bps</span>
                            </div>
                        </div>
                        <form className="w-full flex justify-between h-fit mt-4" onSubmit={(e)=>{updateVitals(e, 'bloodPressure', bloodPressure)}}>
                            <input step={'any'} required type="number" inputMode="numeric" className="w-1/2 bg- border-gray-400 patients-search text-center pr-4 rounded-l-lg" placeholder="new blood pressure" value={bloodPressure} onChange={(e)=>{setBloodPressure(e.target.value)}}/>
                            <button type="submit" className="block bg-red-200 text-red-800 border border-l-0 border-red-800 w-1/2 px-4 py-2 font-semibold text-lg rounded-r-full">update</button>
                        </form>
                    </div>
                :<></>}
                <div className={`${role == 'doctor' || role == 'nurse' ? 'w-8/12' : 'w-full'} h-full`}>
                    <Line ref={ref} data={bloodPressureHistory} width={"100%"} height={"20px"} options={options} />
                </div>
            </div>

            <div className="mt-10 flex justify-between border-b pb-4 border-gray-300 bg-stone-100 p-4 rounded-lg">
                {role == 'doctor' || role == 'nurse' ?
                    <div>
                        <div className="flex justify-between bg-stone-200 pl-2 rounded-lg">
                            <div>
                                <h3 className="text-4xl mt-5 text-stone-500 font-medium border-b border-gray-500">weight</h3>
                                <div className="text-sm font-medium text-gray-500 w-full text-right">({weightHistory.labels.slice(-1)})</div>
                            </div>
                            <div className="text-5xl text-stone-800 font-medium bg-stone-300 w-fit rounded-lg ml-4 h-fit px-4 py-2 my-4">
                                {weightHistory.datasets[0].data.slice(-1)}&deg;<span className="text-xl">bps</span>
                            </div>
                        </div>
                        <form className="w-full flex justify-between h-fit mt-4" onSubmit={(e)=>{updateVitals(e, 'weight', weight)}}>
                            <input step={'any'} required type="number" inputMode="numeric" className="w-1/2 bg- border-gray-400 patients-search text-center pr-4 rounded-l-lg" placeholder="new weight" value={weight} onChange={(e)=>{setWeight(e.target.value)}}/>
                            <button type="submit" className="block bg-stone-200 text-stone-800 border border-l-0 border-stone-800 w-1/2 px-4 py-2 font-semibold text-lg rounded-r-full">update</button>
                        </form>
                    </div>
                :<></>}
                <div className={`${role == 'doctor' || role == 'nurse' ? 'w-8/12' : 'w-full'} h-full`}>
                    <Line ref={ref} data={weightHistory} width={"100%"} height={"20px"} options={options} />
                </div>
            </div>
        </div>    
    )
}

export default Vitals