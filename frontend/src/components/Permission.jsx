import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Permission = () => {
    const [role, setRole] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/auth/roles')
            .then(result => {
                if (result.data.Status) {
                    setRole(result.data.Result)
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
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Assign Permission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {role.map(role => (
                            <tr key={role.id}>
                                <td>{role.name}</td>
                                <td>Permission</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Permission
