import axios from 'axios'

const client = axios.create({
  baseURL: 'https://api.caiman-app.de/api/',
})

export default client
