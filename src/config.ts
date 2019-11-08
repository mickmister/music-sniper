import axios from 'axios'
import {loadProgressBar} from 'axios-progress-bar'

loadProgressBar()

// axios.defaults.baseURL = process.env.API_HOST
// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://music-sniper-rails.herokuapp.com'
} else {
    axios.defaults.baseURL = 'http://localhost:1234/api'
}

window.axios = axios
