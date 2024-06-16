import axios from "axios"


export const commonRequest = async (method, url, body) => {
    const config = {
        method,
        url,
        data:body
    }

    return await axios(config).then(data => {
        return data
    }
    ).catch(data => {
        return data
    })
}