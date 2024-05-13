import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const TestsList = ()=>{
    return(
        <div className="table-list">
            <table className="table-fixed w-full pt-5">
                <thead className="border-b border-l border-gray-300 sticky top-0 bg-white">
                    <tr>
                        <th>test id</th>
                        <th>date created</th>
                        <th>test name</th>
                        <th>health center</th>
                        <th>tests results</th>
                        <th>report link</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {[...Array(50).keys()].map(record=>{
                        return(
                            <tr className="border-b border-gray-400 hover:bg-white transition-all hover:cursor-pointer">
                                <td className="">01</td>
                                <td>01/02/2024</td>
                                <td>john doe</td>
                                <td>
                                    <div className="border border-blue-600 rounded-lg text-blue-600 bg-white">general hospital</div>
                                </td>
                                <td>
                                    <div className="border border-blue-600 rounded-lg text-blue-600 bg-white w-fit m-auto px-5">positive</div>
                                </td>
                                <td>
                                    <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" className="navigation-icon" />
                                {/* <div className="">10</div> */}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TestsList