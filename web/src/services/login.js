import axios from "axios"

const login = async (credentials)=>{
    return (
        await axios.post('http://localhost:3000/ehr/root/login', credentials, {withCredentials: true}).then(async response=>{
            if(response.data.success){
                return response.data
            }
        }).catch((error)=>{
            console.log(error.response ? error.response.data : error)
            return error.response.data
        })
    )
}

export default login