import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, Icon } from 'semantic-ui-react'

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

  console.log(employees)
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
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3 className='text-3xl font-extrabold'>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee">
        <button className="ui green button">Add Employee</button>
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Photo</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Salary</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map(employee => (
            <TableRow>
              <TableCell>
                <img className='w-10 h-10 rounded-full shadow-lg' src={`http://localhost:8081/Images/` + employee.photo} alt="profile" />
              </TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.category_name}</TableCell>
              <TableCell>{employee.salary}</TableCell>
              <TableCell>{employee.address}</TableCell>
              <TableCell>
                <Link to={`/dashboard/edit_employee/${employee.id}`}><Icon name='edit' className='edit text-primary cursor-pointer' /></Link>
                <Icon onClick={() => handleDelete(employee.id)} name='trash' className='trash text-danger cursor-pointer' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}

export default Employee
