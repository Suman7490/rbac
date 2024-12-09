import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

const Employee = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8081/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployees(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/auth/delete_employee/' + id)
      .then(result => {
        if (result.data.Status) {
          window.location.reload()
        } else {
          alert(result.data.Error)
        }
      })
  }


  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-12'>
      <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3 className='text-3xl font-extrabold text-violet-800'>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee">
        <button className="ui violet button">Add Employee</button>
      </Link>
      <table className='table mt-4 table-responsive text-violet-800'>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Category</th>
            <th>Salary</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>
                <img className='w-10 h-10 rounded-full shadow-lg' src={`http://localhost:8081/Images/` + employee.photo} alt="profile" />
              </td>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.email}</td>
              <td>{employee.category}</td>
              <td>{employee.salary}</td>
              <td>{employee.address}</td>
              <td>{employee.status}</td>
              <td>
                <Link to={`/dashboard/edit_employee/${employee.id}`}><Icon name='edit' className='edit text-primary cursor-pointer' /></Link>
                <Icon onClick={() => handleDelete(employee.id)} name='trash' className='trash text-danger cursor-pointer' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </div>
    

  )
}

export default Employee
