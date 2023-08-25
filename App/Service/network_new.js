import React from 'react'
import { BASE_URL, CONSUMER_KEY, CONSUMER_SECRET } from './Constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { getAccessToken, getNonce } from './AsyncStorage'

export const network_new = async (method, endpoint, params = {}, data = {}) => {
    var Token = ''
    var Nonce = ''
    return fetch = new Promise(async (resolve, reject) => {
        try {
            const accessToken = await getAccessToken();
            if (accessToken !== null) {
                Token = accessToken
            }
            const nonces = await getNonce();
            if (nonces != null) {
                Nonce = nonces
            }
            if (__DEV__) {
                console.log("Token", accessToken);
                console.log('EndPoint', endpoint);
                console.log('Nonce', nonces)
            }
            let datas = JSON.stringify(data)
            axios.request({
                method: method,
                url: `${BASE_URL}${endpoint}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                    'X-WC-Store-API-Nonce': Nonce
                },
                params: params,
                data: datas
            }).then((response) => {
                // console.log('nonce', response.headers.get('nonce'))
                resolve(response)
                // if (response.data) {
                //     resolve(response.data);
                // } else {
                //     reject('Something Went Wrong');
                // }
            }).catch(error => {
                // console.log('error',JSON.stringify(error))
                reject(error);
            })
            // let config = {
            //     method: method,
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Bearer ' + Token
            //     },
            //     body: datas
            // }
            // fetch(`${BASE_URL}${endpoint}`, config).then(response => {
            //     console.log('response', JSON.stringify(response))
            //     resolve(response);
            // })
        } catch (error) {
            console.log(JSON.stringify(error))
            reject(error);
        }
    })
}
