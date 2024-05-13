import AppButton from "../../shared/app-button/app-button"
import "./report-view.css"

const ReportView = ()=>{
    return (
        <div className="report-view">
            <div className="flex justify-between sticky pt-6 top-0 bg-gray-50 mx-6">
                <div className="font-medium text-gray-500 border-b border-gray-400 pb-2 flex justify-start">
                    <div className="w-fit">
                        <div>report id: 
                            <span className="ml-3 text-gray-900">01</span>
                        </div>
                        <div>date created: 
                            <span className="ml-3 text-gray-900">01/01/2023</span>
                        </div>
                    </div>
                    <div className="w-fit mx-20">
                        <div>doctor: 
                            <span className="ml-3 text-gray-900">John Doe</span>
                        </div>
                        <div>health center: 
                            <span className="ml-3 text-gray-900">general hospital</span>
                        </div>
                    </div>
                    <div className="">
                        <div>test count: 
                            <span className="ml-3 text-gray-900">01</span>
                        </div>
                        <div>prescriptions count: 
                            <span className="ml-3 text-gray-900">01</span>
                        </div>
                    </div>
                </div>
                <div className="ml-6 w-1/3 h-fit flex justify-evenly">
                    <AppButton text={"Edit"} style={"button"}/>
                    <div className="mx-1"></div>
                    <AppButton text={"Download"} style={"link2"}/>
                </div>
            </div>
            <div className="flex justify-between mt-10 mx-6">
                <div className="diagnosis">
                    <div className="">
                        <h3 className="text-xl font-medium">Diagnosis</h3>
                        <p className="p-2 border-l border-b border-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, error cupiditate laborum officia voluptate reprehenderit sit esse vero, voluptas quia animi</p>
                    </div>
                    <div className="mt-10">
                        <h3 className="text-xl font-medium">Prescriptions</h3>
                        <div className="diagnosis border-l pl-2 border-gray-400">
                            {[...Array(10).keys()].map(pres=>{
                                return(
                                    <div className="w-full border-l border-b border-gray-400">
                                        <div className="p-3 pb-2">
                                            <h4 className="text-lg text-primary-green">Parcetamol</h4>
                                            <div className="w-full flex justify-between">
                                                <div className="flex w-full justify-between text-center border-t border-r border-gray-400 px-4 pt-2">
                                                    <div>
                                                        <div>morning</div>
                                                        <div className="text-xl font-medium">01</div>
                                                    </div>
                                                    <div>
                                                        <div>afternoon</div>
                                                        <div className="text-xl font-medium">01</div>
                                                    </div>
                                                    <div>
                                                        <div>evening</div>
                                                        <div className="text-xl font-medium">01</div>
                                                    </div>
                                                </div>
                                                <div className="mx-6 mt-10 text-blue-500">tablets</div>
                                            </div>
                                        </div>
                                    </div>     
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="diagnosis w-full">
                    <h3 className="w-full text-xl font-medium">Tests</h3>
                    <div className="w-full h-full bg-gray-100 mt-2 py-1">
                        {[...Array(5).keys()].map(test=>{
                            return(
                                <div className="p-4 mx-2 bg-white rounded-md my-4">
                                <h4 className="text-lg text-primary-green">Malaria</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aliquid ipsum. Iste esse, id nobis quo maiores laudantium. Quisquam velit suscipit error atque rem nisi non. Nemo quisquam repellendus dolor!</p>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportView