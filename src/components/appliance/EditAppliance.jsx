import React, { useState } from 'react';
import FormError from './FormError';

const EditAppliance = (props) => {
    const { update, appliance } = props
    const [brand, setBrand] = useState(appliance.brand)
    const [model, setModel] = useState(appliance.model)
    const [serial, setSerial] = useState(appliance.serialNum)
    const [status, setStatus] = useState(appliance.status)
    const [date, setDate] = useState(appliance.dateBought)
    const [error, setError] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        validateAndSubmit()
    }

    const validateAndSubmit = () => {
        const newError = []
        if (!brand) {
            newError.push('Please enter brand!')
        }

        if (!model) {
            newError.push('Please enter model!')
        }

        if (!serial) {
            newError.push('Please enter serial number!')
        }

        if (!status) {
            newError.push('Please enter status!')
        }

        if (!date) {
            newError.push('Please enter date of purchase!')
        }

        if (newError.length === 0) {
            const newAppliance = {
                brand: brand,
                model: model,
                serialNum: serial,
                status: status,
                dateBought: date,
            }
            update(appliance.id, newAppliance)
        } else {
            setError(newError)
        }
    }

    return (
        <div className="card z-depth-0">
            <div className="card-content">
                <span className="card-title">Edit Appliance</span>

                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label className="active">Brand</label>
                        <input type="text" onChange={(e) => setBrand(e.target.value)} value={brand} />
                    </div>

                    <div className="input-field">
                        <label className="active">Model</label>
                        <input type="text" onChange={(e) => setModel(e.target.value)} value={model} />
                    </div>

                    <div className="input-field">
                        <label className="active">Serial Number</label>
                        <input type="text" onChange={(e) => setSerial(e.target.value)} value={serial} />
                    </div>

                    <div className="input-field">
                        <label className="active">Status</label>
                        <input type="text" onChange={(e) => setStatus(e.target.value)} value={status} />
                    </div>

                    <label>Purchase Date</label>
                    <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />

                    {error.length > 0 && (
                        <FormError errors={error} />
                    )}

                    <button className="btn z-depth-0 blue darken-2 waves-effect waves-light">
                        <i className="material-icons">send</i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditAppliance
