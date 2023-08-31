import axios from "axios";
import { API_URL, CONSUMER_KEY, CONSUMER_SECRET } from "./Constant";
import Toast from 'react-native-simple-toast';

export const Network = async (method, endpoint, params = {}, base_url = API_URL, data = {}) => {
    return fetch = new Promise(async (resolve, reject) => {
        try {
            const api = axios.create({
                // baseURL: API_URL,
                baseURL: base_url,
                auth: {
                    username: CONSUMER_KEY,
                    password: CONSUMER_SECRET,
                },
            });
            // if (__DEV__) {
            //     console.log('Api_Urll', base_url)
            //     console.log('EndPoint ', endpoint);
            //     console.log('params ', JSON.stringify(params));
            // }
            const response = await api({
                method: method,
                url: endpoint,
                params: params,
                data: data,
            });;
            // console.log('data', response)
            if (response.data) {
                resolve(response.data);
            } else {
                Toast.show(response.message)
                reject('Something Went Wrong');
            }
        } catch (error) {
            console.log('error', error)
            reject(error);
        }
    })
}