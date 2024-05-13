import "./reports-list.css"
import { Link, useNavigate } from "react-router-dom"

const ReportsList = ()=>{
    const navigate = useNavigate()

    return(
        <div className="table-list">
            <table className="table-fixed w-full pt-5">
                <thead className="border-b border-l border-gray-300 sticky top-0 bg-white">
                    <tr>
                        <th>report id</th>
                        <th>date created</th>
                        <th>doctor username</th>
                        <th>health center</th>
                        <th>tests count</th>
                        <th>pres count</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {[...Array(50).keys()].map(recordId=>{
                        return(
                            <tr className="border-b border-gray-400 hover:bg-white transition-all hover:cursor-pointer" onClick={()=>{
                                navigate(`/verified/patients/0/reports/${recordId}`)
                            }}>
                                <td className="">01</td>
                                <td>01/02/2024</td>
                                <td>john doe</td>
                                <td>
                                    <div className="border border-blue-600 rounded-lg text-blue-600 bg-white">general hospital</div>
                                </td>
                                <td>
                                    <div className="border border-blue-600 rounded-lg text-blue-600 bg-white w-fit m-auto px-5">10</div>
                                </td>
                                <td>
                                <div className="border border-blue-600 rounded-lg text-blue-600 bg-white w-fit m-auto px-5">10</div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ReportsList