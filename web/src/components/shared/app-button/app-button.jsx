const AppButton = ({style, type, text, handleClick=()=>{}})=>{

    const clickHandler = ()=>{
        handleClick()
    }

    return(
        <button type={type} className={`border px-6 py-2 rounded-full w-full font-semibold mt-2
            ${
                style=='link' ? 'border-white bg-primary-green text-white':
                style=='link2' ? 'border-primary-green bg-white text-primary-green':
                style=='button' ? 'border-primary-green bg-primary-green text-white':
                style=='cancel' ? 'border-red-500 bg-white text-red-500': style
            }
        `} onClick={()=>{clickHandler()}}>{text}</button>
    )
}

export default AppButton