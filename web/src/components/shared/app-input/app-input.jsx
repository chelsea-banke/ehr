import "./app-input.css"

const AppInput = ({label, placeholder, type="text", required=false, fill=true})=>{
    return (
        <div className="mt-4">
            <label className={`block ml-3 ${required ? 'required' : ''}`} htmlFor="">{label}</label>
            <input required={required} placeholder={placeholder} type={type} className={`${fill ? 'w-full': 'unfill'} border border-gray-600 rounded-md px-3 py-2 mt-1`} />
        </div>
    )
}

export default AppInput