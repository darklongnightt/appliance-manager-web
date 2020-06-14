import axios from 'axios'

const hostAddr = 'https://xavier-capgemini.herokuapp.com';
const defaultErrorStatus = 500;
const defaultErrorMessage = 'An error has occured!';

export const getAllAppliances = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${hostAddr}/appliance/list`)
            .then(resp => {
                resolve(resp)
            }).catch(err => {
                reject({
                    status: err.response ? err.response.status : defaultErrorStatus,
                    message: err.response ? err.response.data.reason : defaultErrorMessage,
                })
            })
    })
}

export const createAppliance = (appliance) => {
    return new Promise((resolve, reject) => {
        axios.post(`${hostAddr}/appliance`, appliance)
            .then(resp => {
                resolve(resp)
            }).catch(err => {
                reject({
                    status: err.response ? err.response.status : defaultErrorStatus,
                    message: err.response ? err.response.data.reason : defaultErrorMessage,
                })
            })
    })
}

export const updateAppliance = (id, appliance) => {
    return new Promise((resolve, reject) => {
        axios.put(`${hostAddr}/appliance?id=${id}`, appliance)
            .then(resp => {
                resolve(resp)
            }).catch(err => {
                reject({
                    status: err.response ? err.response.status : defaultErrorStatus,
                    message: err.response ? err.response.data.reason : defaultErrorMessage,
                })
            })
    })
}

export const deleteAppliance = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${hostAddr}/appliance?id=${id}`)
            .then(resp => {
                resolve(resp)
            }).catch(err => {
                reject({
                    status: err.response ? err.response.status : defaultErrorStatus,
                    message: err.response ? err.response.data.reason : defaultErrorMessage,
                })
            })
    })
}