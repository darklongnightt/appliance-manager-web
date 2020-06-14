import React, { useState } from 'react'
import M from "materialize-css";

const filterTypes = {
    brand: 'Brand',
    model: 'Model',
    serialNum: 'Serial Number',
    status: 'Status',
    dateBought: 'Purchase Date',
}

const Filter = (props) => {
    const {appliances, filter} = props;
    const [search, setSearch] = useState('')
    const [type, setType] = useState('brand')

    const handleSubmit = e => {
        e.preventDefault()
        console.log('search: ', search)
        console.log('type: ', type)

        const updatedAppliances = appliances.filter(item => {
            return item[type].toUpperCase().includes(search.toUpperCase())
        })
        console.log(updatedAppliances)
        filter(updatedAppliances)
    }

    const handleChangeFilterType = e => {
        const filterType = e.target.value
        setType(filterType)

        const data = {}
        appliances.forEach(item => data[item[filterType]] = null)

        const elems = document.querySelectorAll('.autocomplete');
        M.Autocomplete.init(elems, {
            data: data,
        });
    }

    return (
        <div className="card z-depth-0 filter-card">
            <div className="card-content">

                <form onSubmit={handleSubmit} className="filter-form">
                    <div className="input-field select">
                        <select onChange={handleChangeFilterType}>
                            <option value="" disabled selected>Choose Filter</option>
                            {Object.entries(filterTypes).map(([key, val]) => {
                                return <option value={key} key={key}>{val}</option>
                            })}
                        </select>
                    </div>

                    <div className="input-field search">
                        <label>Search</label>
                        <input 
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            id="autocomplete-input"
                            className="autocomplete"
                            autoComplete="off"
                        />
                    </div>

                    <button className="btn z-depth-0 blue darken-2 waves-effect waves-light">
                        <i className="material-icons">send</i>
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Filter
