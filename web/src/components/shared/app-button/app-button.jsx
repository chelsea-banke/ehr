const AppButton = ({style, type, text})=>{

    return(
        <button type={type} className={`border px-6 py-2 rounded-full w-full font-semibold mt-2
            ${
                style=='link' ? 'border-white bg-primary-green text-white':
                style=='button' ? 'border-primary-green bg-primary-green text-white':
                style=='cancel' ? 'border-red-500 bg-white text-red-500': ''
            }
        `}>{text}</button>
    )
}

export default AppButton