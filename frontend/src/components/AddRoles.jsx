import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddRoles = () => {
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8081/auth/add_role', { role })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/roles')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center h-75'>
                <div className='p-3 rounded w-25 border'>
                    <h2 className='text-center text-2xl font-bold py-2'>Add Role</h2>
                    <form className="ui form mt-2" onSubmit={handleSubmit}>
                        <div className="field">
                            <label><strong>Role Name</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter New Category"
                                onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <button className="ui blue button w-100 blue" type="submit">Add Role</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddRoles
