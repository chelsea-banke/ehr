import { faAnchor, faBell, faBellConcierge, faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ellpise from "../../../assets/images/ellipse.png"
import "./top-bar.css"
import { useLocation } from "react-router-dom"

const TopBar = ()=>{

    const location = useLocation()
    const pageName = location.pathname.split('/')[2]

    return(
        <header className="w-screen border border-b border-gray-400 flex justify-between fixed bg-white">
            <div className="flex">
                <h1 className="text-3xl bg-primary-green text-white w-fit py-2 px-3">EHR</h1>
                <h1 className="text-2xl mt-1 text-primary-green w-fit py-2 px-3">{pageName.charAt(0).toUpperCase()+pageName.slice(1)}</h1>
            </div>
            <div className="mr-5">
                <div className="flex">
                    <button className="mx-2">
                        <FontAwesomeIcon icon="fa-solid fa-angle-left" size="xl" color="gray" className="mt-4 navigation-icon"/>
                    </button>
                    <button className="mx-2">
                        <FontAwesomeIcon icon="fa-solid fa-angle-right" size="xl" color="gray" className="mt-4 navigation-icon"/>
                    </button>
                    <button className="mx-2">
                        <FontAwesomeIcon icon="fa-solid fa-rotate-right" size="xl" color="gray"  className="mt-4 navigation-icon"/>
                    </button>
                    <button className="mx-2">
                        <FontAwesomeIcon icon={faBell} size="xl" color="gray" className="mt-4 navigation-icon"/>
                    </button>
                    <button className="mx-2">
                        <img className="border dp mt-3" src={ellpise} alt="" />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default TopBar