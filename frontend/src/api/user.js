import axios from 'axios'
import { baseUrl } from './global.js'

export function login(data) {
    return axios.post(baseUrl + '/tokens', data);
}

export function register(data) {
    return axios.post(baseUrl + '/users', data);
}