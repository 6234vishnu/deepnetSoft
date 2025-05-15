import axios from 'axios'

const backendUrl=import.meta.env.VITE_BACKENDURL
const api= axios.create({
    baseURL:backendUrl,
    withCredentials:true
})

export default api