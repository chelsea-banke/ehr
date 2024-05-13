import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AppButton from "../../shared/app-button/app-button"
import "./create-new-report.css"


const CreateNewReport = ()=>{
    return(
        <div className="create-new-report">
            <div className="sticky pt-6 top-0 bg-gray-50 mx-6 border-b border-gray-400">
                <div className="flex justify-between">
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
                        <AppButton text={"Cancel"} style={"cancel"}/>
                        <div className="mx-1"></div>
                        <AppButton text={"save report"} style={"button"}/>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex">
                        <div>
                            <label htmlFor="" className="block text-lg">Diagnosis</label>
                            <textarea name="" id="" cols="60" rows="7" placeholder="lorem ipsum..." className="mt-2 border border-gray-400 rounded-lg p-2"></textarea>
                        </div>
                        <div className="w-full ml-4">
                            <div>
                                <div className="flex justify-between w-full text-center">
                                    <input type="text" className="block border-b border-gray-400 bg-gray-50 px-2" placeholder="prescription"/>
                                    <div className="dosage-input">
                                        <input type="number" className="text-center bg-gray-50 border-b border-gray-400" placeholder="0" />
                                        <label className="block" htmlFor="">morning</label>
                                    </div>
                                    <div className="dosage-input">
                                        <input type="number"  className=" text-center bg-gray-50 border-b border-gray-400" placeholder="0"/>
                                        <label className="block" htmlFor="">afternoon</label>
                                    </div>
                                    <div className="dosage-input">
                                        <input type="number"  className=" text-center bg-gray-50 border-b border-gray-400" placeholder="0"/>
                                        <label className="block" htmlFor="">evening</label>
                                    </div>
                                </div>
                                <div className="flex">
                                    <select name="" id="" className="p-2 rounded-md h-fit mt-3 mx-2">
                                        <option value="tablet">tablet</option>
                                        <option value="tablet">pills</option>
                                        <option value="tablet">teaspoons</option>
                                        <option value="ml">ml</option>
                                        <option value="cl">cl</option>
                                    </select>
                                    <AppButton text={'add presacription +'} style={"link2"}/>
                                </div>
                            </div>
                            <div className="mt-10">
                                <div className="flex justify-between">
                                    <input type="text" className="block border-b border-gray-400 bg-gray-50 px-2 w-1/2" placeholder="test name"/>
                                    <div className="mx-2"></div>
                                    <input type="text" className="block border-b border-gray-400 bg-gray-50 px-2 w-1/2" placeholder="test description"/>
                                </div>
                                <AppButton text={'add test +'} style={"link2"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-6 mt-8 flex justify-between">
                <div className="diagnosis border-l pl-2 border-gray-400 w-1/2">
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
                <div className="w-1/2 h-full bg-gray-100 mt-2 py-1">
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
    )
}

export default CreateNewReport