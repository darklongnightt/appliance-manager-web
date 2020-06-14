import React from 'react'

const FormError = (props) => {
    const { errors } = props;
    return (
        <div className="card z-depth-0 form-error">
            <div className="card-content red-text">
                <ul>
                    {errors && errors.map(error => {
                        return (
                            <li key={error}>{error}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default FormError
