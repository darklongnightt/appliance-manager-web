import React from 'react'

const RemoveAppliance = (props) => {
    const { appliance, remove } = props;
    return (
        <React.Fragment>
            <h4><i className="modal-icon material-icons">error</i> Remove</h4>
            <h5>Are you sure you want to remove this appliance?</h5>
            <div className="secondary-text">
                <div>Brand: {appliance.brand} </div>
                <div>Model: {appliance.brand} </div>
                <div>Serial Number: {appliance.serialNum} </div>
                <div>Status: {appliance.status} </div>
                <div>Purchase Date: {appliance.dateBought} </div>
            </div>

            <div className="modal-footer white">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={() => remove(appliance.id)}>Confirm</a>
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
            </div>
        </React.Fragment>
    )
}

export default RemoveAppliance
