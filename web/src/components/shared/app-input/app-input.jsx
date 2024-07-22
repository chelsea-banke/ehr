import "./app-input.css"

const AppInput = ({label, placeholder, type="text", required=false, fill=true, value, style=''})=>{
    return (
        <div className="mt-4 w-full">
            <label className={`block ml-3 ${required ? 'required' : ''}`} htmlFor="">{label}</label>
            <input required={required} placeholder={placeholder} type={type} className={`${fill ? 'w-full': 'unfill'} border border-gray-600 rounded-md px-3 py-2 mt-1 ${style}`}  onChange={(e)=>{value(e.target.value)}}/>
        </div>
    )
}

export default AppInput