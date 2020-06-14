import React, { useState, useEffect } from 'react';
import { getAllAppliances, createAppliance, updateAppliance, deleteAppliance } from '../../utils/Endpoints';
import Appliance from './Appliance';
import CreateAppliance from './CreateAppliance';
import M from "materialize-css";
import Filter from './Filter';

const ApplianceList = () => {
    const [appliances, setAppliances] = useState([])
    const [filteredAppliances, setFilteredAppliances] = useState([])

    useEffect(() => {
        getAppliances()
        // eslint-disable-next-line
    }, [])

    M.AutoInit()
    const elems = document.querySelectorAll('.modal');
    const modals = M.Modal.init(elems, {});

    const closeModals = () => {
        modals.map(modal => {
            return modal.close();
        });
    };

    const showError = (err) => {
        M.toast({
            html: `${err.status}: ${err.message}`,
            displayLength: Infinity
        })
    }

    const filter = (filteredList) => {
        setFilteredAppliances(filteredList)
    }

    const getAppliances = () => {
        getAllAppliances().then(resp => {
            setAppliances(resp.data)
            setFilteredAppliances(resp.data)
        }).catch(err => {
            showError(err)
        })
    }

    const create = (appliance) => {
        createAppliance(appliance).then(resp => {
            const newAppliance = { ...resp.data }
            const updatedAppliances = [...appliances, newAppliance]
            setAppliances(updatedAppliances)
            setFilteredAppliances(updatedAppliances)
            closeModals()
            M.toast({html: 'Successfully created appliance entry!'})
        }).catch(err => {
            showError(err)
        })
    }

    const update = (id, appliance) => {
        updateAppliance(id, appliance).then(resp => {
            const updatedAppliance = { ...resp.data }
            const updatedAppliances = appliances.map(item => {
                return (item.id === id ? updatedAppliance : item)
            })
            setAppliances(updatedAppliances)
            setFilteredAppliances(updatedAppliances)
            closeModals()
            M.toast({html: 'Successfully updated appliance entry!'})
        }).catch(err => {
            showError(err)
        })
    }

    const remove = (id) => {
        deleteAppliance(id).then(() => {
            const updatedAppliances = appliances.filter(item => {
                return (item.id !== id)
            })
            setAppliances(updatedAppliances)
            setFilteredAppliances(updatedAppliances)
            M.toast({html: 'Successfully removed appliance entry!'})
        }).catch(err => {
            showError(err)
        })
    }

    return (
        <div className="container">
            <Filter appliances={appliances} filter={filter} />

            <ul className="collection with-header">
                <li className="collection-header">
                    <div className="flex-container">
                        <div className="flex-item">
                            <h4>Appliances</h4>
                        </div>

                        <div className="flex-item-right">
                            <a className="btn-floating waves-effect waves-light z-depth-0 blue darken-2 modal-trigger" href="#createModal"><i className="material-icons">add</i></a>
                        </div>
                    </div>

                </li>
                {filteredAppliances.length > 0 ? filteredAppliances.map(item => {
                    return (
                        <Appliance key={item.id} appliance={item} update={update} remove={remove} />
                    )
                }) : <li className="collection-item">
                        <div>
                            You have no appliance!
                        </div>
                    </li>}
            </ul>

            <div id="createModal" className="modal">
                <div className="modal-content white">
                    <CreateAppliance create={create} />
                </div>
            </div>
        </div>
    )
}

export default ApplianceList
