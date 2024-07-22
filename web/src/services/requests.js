import axios from "axios"

const getRequest = async (url)=>{
    return (
        await axios.get(url, {withCredentials: true}).then(async response=>{
            if(response.data.success){
                return response.data
            }
        }).catch((error)=>{
            console.log(error.response ? error.response.data : error)
            return error.response.data
        })
    )
}

const postRequest = async (url, payload)=>{
    return (
        await axios.post(url, payload, {withCredentials: true}).then(async response=>{
            if(response.data.success){
                return response.data
            }
        }).catch((error)=>{
            console.log(error.response ? error.response.data : error)
            return error.response.data
        })
    )
}

const deleteRequest = async (url, payload)=>{
    return (
        await axios.delete(url, {
            data: payload,
            withCredentials: true
        }).then(async response=>{
            if(response.data.success){
                return response.data
            }
        }).catch((error)=>{
            console.log(error.response ? error.response.data : error)
            return error.response.data
        })
    )
}

export default { getRequest, postRequest, deleteRequest }