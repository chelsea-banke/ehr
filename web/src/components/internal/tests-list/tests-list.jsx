import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Placeholder from "../../shared/placeholder/placeholder"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchTests } from "../../../store/slices/testListSlice"
import { fetchReport } from "../../../store/slices/reportSlice"
import { fetchTest } from "../../../store/slices/testSlice"

const TestsList = ()=>{

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tests = (useSelector(state => state.testsList)).tests
    const patient = useSelector(state => state.patient)
    const staff = useSelector(state => state.staff)
    const role = useSelector(state => state.role)
    const location = useLocation()

    useEffect(()=>{
        // dispatch(fetchTests(patient['username']))
    }, [])

    return(
        <div className="table-list">
            <table className="table-fixed w-full pt-5">
                <thead className="border-b border-l border-gray-300 sticky top-0 bg-white">
                    <tr>
                    <th className="index bg-gray-100 border-r border-gray-400">idx</th>
                        <th>test id</th>
                        <th>date created</th>
                        <th>test name</th>
                        <th>health center</th>
                        <th>tests results</th>
                        <th>report link</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {tests.map(test=>{
                        return(
                            <tr className="border-b border-gray-400 hover:bg-white transition-all hover:cursor-pointer" onClick={async (e)=>{
                                    if(!e.target.classList.contains('report-link')){
                                        await dispatch(fetchTest({role: role, testId: test['testId']}))
                                        location.pathname.split('/')[2] == 'patients' ?
                                            navigate(`/verified/patients/${patient['username']}/tests/${test['testId']}`)
                                        :
                                            navigate(`/verified/staffs/${staff['username']}/tests/${test['testId']}`)
                                    }
                                }}>
                                    <td className="index  bg-gray-100  border-r border-gray-400">{test['testId']}</td>
                                <td className="">{test['testId']}</td>
                                <td>{test['dateCreated'].slice(0, 10)}</td>
                                <td>{test['patientUsername']}</td>
                                <td>
                                    <div className="border border-blue-600 rounded-lg text-blue-600 bg-white">{test['doctorCenterCenterId']}</div>
                                </td>
                                <td>
                                    <div className="border border-blue-600 rounded-lg text-blue-600 bg-white w-fit m-auto px-5">{test['results']}</div>
                                </td>
                                <td className="">
                                    <button className="bg-primary-green w-full py-1 rounded-lg text-white report-link font-medium" onClick={async ()=>{
                                        await dispatch(fetchReport({role: role, reportId: test['reportReportId']}))
                                        location.pathname.split('/')[2] == 'patients' ?
                                        navigate(`/verified/patients/:${patient['username']}/reports/:${test['reportId']}`)
                                        :
                                        navigate(`/verified/staffs/:${staff['username']}/reports/:${test['reportId']}`)
                                    }}>
                                        {test['reportReportId']}
                                        <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" className="navigation-icon mx-2" color="white" />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {tests.length == 0 ?<Placeholder text="No Tests Recorded Yet" style={'mt-60 text-7xl'} /> : <></>}
        </div>
    )
}

export default TestsList