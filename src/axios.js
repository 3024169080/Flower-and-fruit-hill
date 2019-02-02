import axios from 'axios'
// axios.defaults.baseURL="http://localhost:8080/"
const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'http://moff.purvavideha.cn/'
axios.defaults.baseURL =baseURL

export default axios