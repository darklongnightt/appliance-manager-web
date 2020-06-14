import React, { useState } from 'react';
import FormError from './FormError';

const CreateAppliance = (props) => {
    const { create } = props
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [serial, setSerial] = useState('')
    const [status, setStatus] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        validateAndSubmit()
    }

    const clearState = () => {
        setBrand('')
        setModel('')
        setSerial('')
        setStatus('')
        setDate('')
        setError('')
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
            create(newAppliance)
            clearState()
        } else {
            setError(newError)
        }
    }

    return (
        <div className="card z-depth-0">
            <div className="card-content">
                <span className="card-title">Create Appliance</span>

                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label>Brand</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </div>

                    <div className="input-field">
                        <label>Model</label>
                        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                    </div>

                    <div className="input-field">
                        <label>Serial Number</label>
                        <input type="text" value={serial} onChange={(e) => setSerial(e.target.value)} />
                    </div>

                    <div className="input-field">
                        <label>Status</label>
                        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                    </div>

                    <label>Purchase Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

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

export default CreateAppliance
