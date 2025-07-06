import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [category, setCategory] = useState([])
    const [role, setRole] = useState([])
    const [employee, setEmployee] = useState({
        name: '',
        role: '',
        email: '',
        category: '',
        salary: '',
        address: '',
        status: ''
    })
    useEffect(() => {
        axios.get('http://localhost:8081/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))

        axios.get('http://localhost:8081/auth/roles')
            .then(result => {
                if (result.data.Status) {
                    setRole(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))

        axios.get('http://localhost:8081/auth/employee/' + id)
            .then(result => {
                setEmployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    role: result.data.Result[0].role,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    salary: result.data.Result[0].salary,
                    category: result.data.Result[0].category,
                    status: result.data.Result[0].status,
                })
            }).catch(err => console.log(err))

    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting employee:", employee);
        axios.put('http://localhost:8081/auth/edit_employee/' + id, employee)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                    alert("Employee updated successfully")
                } else {
                    alert("Error from backend: " + result.data.Error);
                }
            })
            .catch(err => console.log("error from frontend", err))
    }
    return (
        <>
            <div className='d-flex justify-content-center align-items-center h-75'>
                <div className='p-3 rounded w-50 border'>
                    <h2 className='text-center text-2xl font-bold py-2'>Update Employee</h2>
                    <form className="ui form mt-2" onSubmit={handleSubmit}>
                        <div className="fields two">
                            <div className="field">
                                <label><strong>Employee Name</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    value={employee.name}
                                    onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
                            </div>
                            <div className="field">
                                <label><strong>Role</strong></label>
                                <select
                                    name='role'
                                    className='form-control'
                                    value={employee.role}
                                    onChange={(e) => setEmployee({ ...employee, role: e.target.value })}>
                                    <option>Select role</option>
                                    {role.map((role, index) => (
                                        <option key={index} value={role.role}>{role.role}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="fields two">
                            <div className="field">
                                <label><strong>Employee Email</strong></label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={employee.email}
                                    onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                            </div>
                            <div className="field">
                                <label><strong>Employee Category</strong></label>
                                <select
                                    name='category'
                                    className='form-control'
                                    value={employee.category}
                                    onChange={(e) => setEmployee({ ...employee, category: e.target.value })}>
                                    <option>Select Category</option>
                                    {category.map((category, index) => {
                                        return <option key={index} value={category.category}>{category.category}</option>
                                    })}

                                </select>
                            </div>
                        </div>
                        <div className="fields two">
                            <div className="field">
                                <label><strong>Employee Salary</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Salary"
                                    value={employee.salary}
                                    onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
                            </div>
                            <div className="field">
                                <label><strong>Employee Address</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Address"
                                    value={employee.address}
                                    onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
                            </div>
                        </div>
                        <div className="field">
                            <label><strong>Status</strong></label>
                            <select name='status'
                                className='form-control'
                                value={employee.status}
                                onChange={(e) => setEmployee({ ...employee, status: e.target.value })}>
                                <option>Select Status</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                        <button className="ui blue button w-100 blue" type="submit">Update Employee</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditEmployee
