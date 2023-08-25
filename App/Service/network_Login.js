import React from 'react'
import { BASE_URL, CONSUMER_KEY, CONSUMER_SECRET } from './Constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { getAccessToken, getNonce } from './AsyncStorage'

export const network_Login = async (method, endpoint) => {
    return fetch = new Promise(async (resolve, reject) => {
        try {
            let config = {
                method: method,
                url: `${BASE_URL}${endpoint}`,
            }
            if (__DEV__) {
                console.log('EndPoint', endpoint)
            }
            axios.request(config).then((response) => {
                // console.log('nonce', response.headers.get('nonce'))
                resolve(response)
            }).catch(error => {
                // console.log('error',JSON.stringify(error))
                reject(error);
            })
        } catch (error) {
            // console.log(JSON.stringify(error))
            reject(error);
        }
    })
}
