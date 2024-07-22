import { useDispatch, useSelector } from "react-redux"
import "./reports-list.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { fetchReports } from "../../../store/slices/reportListSlice"
import Placeholder from "../../shared/placeholder/placeholder"
import { fetchReport } from "../../../store/slices/reportSlice"
import { fetchTests } from "../../../store/slices/testListSlice"

const ReportsList = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const reportsList = useSelector(state => state.reportsList)
    const testsList = useSelector(state => state.testsList)
    const patient = useSelector(state => state.patient)
    const staff = useSelector(state => state.staff)
    const role = useSelector(state => state.role)
    const report = useSelector(state => state.report)
    const location = useLocation()

    useEffect(()=>{
        // dispatch(fetchReports(patient['username']))
        // dispatch(fetchTests(patient['username']))
    }, [])

    return(
        <div className="table-list">
            <table className="table-fixed w-full pt-5">
                <thead className="border-b border-l border-gray-300 sticky top-0 bg-white">
                    <tr>
                        <th className="index bg-gray-100 border-r border-gray-400">idx</th>
                        <th>report id</th>
                        <th>date created</th>
                        <th>doctor username</th>
                        <th>health center</th>
                        <th>tests count</th>
                        <th>pres count</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {reportsList.reports.map(report=>{
                        return(
                            <tr className="border-b border-gray-400 hover:bg-white transition-all hover:cursor-pointer" onClick={async ()=>{
                                    await dispatch(fetchReport({role: role, reportId: report['reportId']}))
                                    location.pathname.split('/')[2] == 'patients' ?
                                        navigate(`/verified/patients/:${patient['username']}/reports/:${report['reportId']}`)
                                        :
                                        navigate(`/verified/staffs/:${staff['username']}/reports/:${report['reportId']}`)
                                }}>
                                <td className="index  bg-gray-100  border-r border-gray-400">{report['position']}</td>
                                <td className="">{report['reportId']}</td>
                                <td>{report['dateCreated'].slice(0, 10)}</td>
                                <td>{report['doctorUsername']}</td>
                                <td>
                                    <div className="border border-blue-600 rounded-lg text-blue-600 bg-white">{report['doctorCenterCenterId']}</div>
                                </td>
                                <td>
                                    <div className="border border-blue-600 rounded-lg text-blue-600 bg-white w-fit m-auto px-5">{testsList.tests.filter(test => test['reportReportId'] == report['reportId']).length}</div>
                                </td>
                                <td>
                                <div className="border border-blue-600 rounded-lg text-blue-600 bg-white w-fit m-auto px-5">10</div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {reportsList.reports.length == 0 ?<Placeholder text="No Reports Recorded Yet" style={'mt-60 text-7xl'} /> : <></>}
        </div>
    )
}

export default ReportsList