const Placeholder = ({style, text="EHR"})=>{
    return(
        <div className={`m-auto text-center text-gray-300 ${style}`}>
            {text}
        </div>
    )
}

export default Placeholder