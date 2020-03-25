import axios from 'axios'

// axios.defaults.baseURL = process.env.API_HOST
// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://qa-music-sniper-rails.herokuapp.com'
} else {
    // axios.defaults.baseURL = '/api'
    // axios.defaults.baseURL = 'https://music-sniper-rails.herokuapp.com'
    axios.defaults.baseURL = 'http://localhost:3000'
}

window.axios = axios

const CONFIG_VARS = {
    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
}

export default CONFIG_VARS
