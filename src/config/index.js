import "script-loader!easemob-websdk/dist/strophe-1.2.8.js"
import config from './WebIMConfig'
import websdk from 'easemob-websdk'
import axios from "axios"


// let WebIM = window.WebIM || {}

// WebIM.config = config


// WebIM.conn = new websdk.connection({
//     isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
//     https: WebIM.config.https,
//     url: WebIM.config.xmppURL,
//     isAutoLogin: false,
//     heartBeatWait: WebIM.config.heartBeatWait,
//     autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
//     autoReconnectInterval: WebIM.config.autoReconnectInterval,
//     isStropheLog: WebIM.config.isStropheLog,
//     delivery: WebIM.config.delivery
// })

// if (!WebIM.conn.apiUrl) {
//     WebIM.conn.apiUrl = WebIM.config.apiURL
// }

// const appKeyPair = WebIM.config.appkey.split("#")
// export let api = Api.create({
//     baseURL: `${WebIM.config.apiURL}/${appKeyPair[0]}/${appKeyPair[1]}`,
//     validateStatus: function (status) {
//         return true
//     }
// })

// function requestFail(data) {
//     if (data.data && data.data.error_description) {
//         data.msg = data.data.error_description
//     } else if (data.data && data.data.data && data.data.data.error_description) {
//         data.msg = data.data.data.error_description
//     }
//     return Promise.reject(data)
// }

// api.interceptors.response.use(
//     function (resp) {
//         if (resp.status >= 300) {
//             return requestFail(resp)
//         }
//         if (resp.data && resp.data.status && resp.data.status !== 200) {
//             return requestFail(resp.data)
//         }
//         if (resp.data && resp.data.data) {
//             resp.data = resp.data.data
//         }
//         return resp
//     },
//     function (error) {
//         console.log(error)
//     }
// )


// WebIM.api = api

// export default WebIM



let WebIM = window.WebIM || websdk

WebIM.config = config

WebIM.conn = new websdk.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: WebIM.config.https,
    url: WebIM.config.xmppURL,
    isAutoLogin: WebIM.config.isAutoLogin,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    isStropheLog: WebIM.config.isStropheLog,
    delivery: WebIM.config.delivery
})


if (!WebIM.conn.apiUrl) {
    WebIM.conn.apiUrl = WebIM.config.apiURL
}

/* eslint-disable */
const appKeyPair = WebIM.config.appkey.split("#")

export let api = axios.create({
    baseURL: `${WebIM.config.apiURL}/${appKeyPair[0]}/${appKeyPair[1]}`,
    validateStatus: function (status) {
        return true
    }
})


function requestFail(data) {
    if (data.data && data.data.error_description) {
        data.msg = data.data.error_description
    } else if (data.data && data.data.data && data.data.data.error_description) {
        data.msg = data.data.data.error_description
    }
    console.error("Error:" + data.status + ", " + data.msg)
    return Promise.reject(data)
}

api.interceptors.response.use(
    function (resp) {
        if (resp.status >= 300) {
            return requestFail(resp)
        }
        if (resp.data && resp.data.status && resp.data.status !== 200) {
            return requestFail(resp.data)
        }
        if (resp.data && resp.data.data) {
            resp.data = resp.data.data
        }
        return resp
    },
    function (error) {
        console.log(error)
    }
)

WebIM.api = api

export default WebIM