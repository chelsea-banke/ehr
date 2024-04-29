import { faAnchor, faBell, faBellConcierge, faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ellpise from "../../../assets/images/ellipse.png"
import "./top-bar.css"

const TopBar = ()=>{
    return(
        <header className="w-screen border border-b border-gray-400 flex justify-between fixed bg-white">
            <h1 className="text-3xl bg-primary-green text-white w-fit py-2 px-3">EHR</h1>
            <div className="mr-5">
                <div className="flex">
                    <FontAwesomeIcon icon={faBell} size="xl" className="mt-4"/>
                    <img className="border dp mt-3 ml-3" src={ellpise} alt="" />
                </div>
            </div>
        </header>
    )
}

export default TopBar