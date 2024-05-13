const Placeholder = ({style, text="EHR"})=>{
    return(
        <div className={`m-auto text-center text-9xl text-gray-300 ${style}`}>
            {text}
        </div>
    )
}

export default Placeholder