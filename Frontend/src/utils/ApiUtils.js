import axios from "axios"


class ApiUtils {
    constructor(baseUrl) {
        this.api = axios.create({
            baseURL: baseUrl,
            timeout: 8000,
            withCredentials: true
        })

        this.api.interceptors.request.use(()=>{
            
        })

        
    }


}



const apiUtils = new ApiUtils()