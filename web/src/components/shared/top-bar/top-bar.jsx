import { faAnchor, faBell, faBellConcierge, faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ellpise from "../../../assets/images/ellipse.png"
import "./top-bar.css"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { reloadStates } from "../../../services/reload"


const TopBar = ()=>{

    const location = useLocation()
    const pageName = location.pathname.split('/')[2]
    const [notificationsDisplay, setNotificationsDisplay] = useState(false)
    const role = useSelector(state => state.role)
    const user = useSelector(state => state.user)

    return(
        <>
            <header className="w-screen border border-b border-gray-400 flex justify-between fixed bg-white transition-all top-bar">
                <div className="flex">
                    <h1 className="text-3xl bg-primary-green text-white w-fit py-2 px-3">EHR</h1>
                    <h1 className="text-2xl mt-1 text-primary-green w-fit py-2 px-3">{pageName.charAt(0).toUpperCase()+pageName.slice(1)}</h1>
                </div>
                {/* <div className="h-fit px-2 bg-blue-500 font-medium text-white ">{user['centerCenterId']}</div> */}
                <div className="mr-5">
                    <div className="flex">
                        <button className="mx-2">
                            <FontAwesomeIcon icon="fa-solid fa-angle-left" size="xl" color="gray" className="mt-4 navigation-icon"/>
                        </button>
                        <button className="mx-2">
                            <FontAwesomeIcon icon="fa-solid fa-angle-right" size="xl" color="gray" className="mt-4 navigation-icon"/>
                        </button>
                        <button className="mx-2" onClick={()=>{reloadStates()}}>
                            <FontAwesomeIcon icon="fa-solid fa-rotate-right" size="xl" color="gray"  className="mt-4 navigation-icon"/>
                        </button>
                        {!notificationsDisplay ? 
                            <button className="mx-2">
                                <FontAwesomeIcon icon={faBell} size="xl" color="gray" className="mt-4 navigation-icon" onClick={()=>{setNotificationsDisplay(!notificationsDisplay)}}/>
                            </button> :
                            <div className="notif-placeholder"></div>
                        }
                        <div className="mt-4 mx-2 font-medium bg-primary-green h-fit text-white px-4 rounded-full">{role}</div>
                        <button className="mx-2">
                            <img className="border dp mt-3" src={ellpise} alt="" />
                        </button>
                    </div>
                </div>
            </header>
            <div className={`notifications fixed bg-gray-50 border border-t-0 border-gray-400 px-3 py-2 mt-14 right-0 transition-all notifications-${notificationsDisplay ? "in" : "out"}`}>
                <div className="border-b border-gray-400 px-2 flex justify-between">
                    <div>Notifications</div>
                    <button  onClick={()=>{setNotificationsDisplay(!notificationsDisplay)}}>
                        <FontAwesomeIcon icon="fa-solid fa-close" size="xl" color="gray" className="navigation-icon hover:cursor-pointer"/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default TopBar