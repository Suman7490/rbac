import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Roles = () => {
    const [role, setRole] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/auth/roles')
            .then(result => {
                if (result.data.Status) {
                    setRole(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])
  return (
<>
<div className='px-5 mt-5'>
                <div className='d-flex justify-content-center'>
                    <h3 className='text-3xl font-extrabold'>Roles List</h3>
                </div>
                <Link to="/dashboard/add_role">
                    <button className="ui green button">Add Role</button>
                </Link>
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {role.map(role => (
                        <tr key={role.id}>
                            <td>{role.name}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
</>
  )
}

export default Roles
