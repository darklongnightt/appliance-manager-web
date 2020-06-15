import React, { useState, useEffect } from 'react';
import M from "materialize-css";
import { getAllAppliances, createAppliance, updateAppliance, deleteAppliance } from '../../utils/Endpoints';
import Appliance from './Appliance';
import CreateAppliance from './CreateAppliance';
import Filter from './Filter';
import Preloader from '../layout/Preloader';

const ApplianceList = () => {
    const [appliances, setAppliances] = useState([])
    const [loading, setLoading] = useState(true)
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
            setLoading(false)
        }).catch(err => {
            showError(err)
            setLoading(false)
        })
    }

    const create = (appliance) => {
        createAppliance(appliance).then(resp => {
            const newAppliance = { ...resp.data }
            const updatedAppliances = [...appliances, newAppliance]
            setAppliances(updatedAppliances)
            setFilteredAppliances(updatedAppliances)
            closeModals()
            M.toast({ html: 'Successfully created appliance entry!' })
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
            M.toast({ html: 'Successfully updated appliance entry!' })
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
            M.toast({ html: 'Successfully removed appliance entry!' })
        }).catch(err => {
            showError(err)
        })
    }

    if (loading) {
        return (
            <Preloader />
        )
    }

    return (
        <div className="container">
            {appliances.length > 0 && (
                <Filter appliances={appliances} filter={filter} />
            )}

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
