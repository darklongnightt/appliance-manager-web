import React from 'react';
import EditAppliance from './EditAppliance';
import RemoveAppliance from './RemoveAppliance';
import M from "materialize-css";

const Appliance = (props) => {
    console.log(props)
    const { appliance, update, remove } = props
    const editId = `edit${appliance.id}`
    const removeId = `remove${appliance.id}`

    const handleClick = (id) => {
        const elem = document.getElementById(id);
        const instance = M.Modal.init(elem, {});
        instance.open();
    }

    return (
        <React.Fragment>
            <li className="collection-item">
                <div>
                    <div className="flex-container">
                        <div className="flex-item">
                            <span className="brand">Brand: {appliance.brand} </span>
                            <span className="model">Model: {appliance.model} </span>
                        </div>

                        <a className="secondary-content modal-trigger flex-item-right" href={'#' + removeId} onClick={() => handleClick(removeId)}>
                            <i className="material-icons delete">delete</i>
                        </a>

                        <a className="secondary-content modal-trigger flex-item-right" href={'#' + editId} onClick={() => handleClick(editId)}>
                            <i className="material-icons edit">edit</i>
                        </a>
                    </div>

                    <div>
                        <span className="status-badge">{appliance.status}</span>
                        <span className="secondary-text">Purchased: {appliance.dateBought} </span>
                        <span className="serial">{appliance.serialNum}</span>
                    </div>

                    <div id={removeId} className="modal">
                        <div className="modal-content white">
                            <RemoveAppliance appliance={appliance} remove={remove} />
                        </div>
                    </div>

                    <div id={editId} className="modal">
                        <div className="modal-content white">
                            <EditAppliance appliance={appliance} update={update} />
                        </div>
                    </div>
                </div>
            </li>
        </React.Fragment >
    )
}

export default Appliance
