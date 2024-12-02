import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        role: '',
        email: '',
        password: '',
        category_name: '',
        salary: '',
        address: '',
        photo: ''
    })
    const [category, setCategory] = useState([])
    const navigate = useNavigate()

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
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('role', employee.role);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('category_name', employee.category_name);
        formData.append('salary', employee.salary);
        formData.append('address', employee.address);
        formData.append('photo', employee.photo);
        axios.post('http://localhost:8081/auth/add_employee', formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                    alert("Employee added successfully")
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    // *******************

    return (
        <>
            <div className='d-flex justify-content-center align-items-center h-75'>
                <div className='p-3 rounded w-50 border'>
                    <h2 className='text-center text-2xl font-bold py-2'>Add Employee</h2>
                    <form className="ui form mt-2" onSubmit={handleSubmit}>
                        <div className="fields two">
                            <div className="field">
                                <label><strong>Employee Name</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
                            </div>
                            <div className="field">
                                <label><strong>Role</strong></label>
                                <select name='role' className='form-control' onChange={(e) => setEmployee({ ...employee, role: e.target.value })}>
                                    <option>Select role</option>
                                    <option>Admin</option>
                                    <option>Employee</option>
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
                                    onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                            </div>
                            <div className="field">
                                <label><strong>Employee Password</strong></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    onChange={(e) => setEmployee({ ...employee, password: e.target.value })} />
                            </div>
                        </div>
                        <div className="fields two">
                            <div className="field">
                                <label><strong>Employee Category</strong></label>
                                <select name='category_name' className='form-control' onChange={(e) => setEmployee({ ...employee, category_name: e.target.value })}>
                                    <option>Select Category</option>
                                    {category.map(category => {
                                        return <option value={category.name}>{category.name}</option>
                                    })}

                                </select>
                            </div>
                            <div className="field">
                                <label><strong>Employee Salary</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Salary"
                                    onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
                            </div>
                        </div>
                        <div className="fields two">
                            <div className="field">
                                <label><strong>Employee Address</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Address"
                                    onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
                            </div>
                            <div className="field">
                                <label><strong>Employee Photo</strong></label>
                                <input
                                    type="file"
                                    name="photo"
                                    className="form-control py-1"
                                    placeholder="Choose photo"
                                    onChange={(e) => setEmployee({ ...employee, photo: e.target.files[0] })} />
                            </div>
                        </div>
                        <button className="ui blue button w-100 blue" type="submit">Add Employee</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddEmployee