import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.1.65:8080'
    // baseURL: 'https://my-json-server.typicode.com/lucassdr/plantmanager-api'
})

export default api