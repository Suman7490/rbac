import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setEmployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, [])

  const adminRecords = () => {
    axios.get('http://localhost:8081/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result)
        }
      })
  }

  const adminCount = () => {
    axios.get('http://localhost:8081/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        }
      })
  }
  const employeeCount = () => {
    axios.get('http://localhost:8081/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee)
        }
      })
  }
  const salaryCount = () => {
    axios.get('http://localhost:8081/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salary)
        }
      })
  }
  return (
    <>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 border shadow-sm w-25'>
          <div className='text-center pb-3'>
            <h4 className='text-2xl font-bold'>Admin</h4>
          </div>
          <hr />
          <div className='py-3 d-flex justify-between'>
            <h5 className='text-lg font-semibold'>Total:</h5>
            <h5 className='text-lg font-semibold'>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 border shadow-sm w-25'>
          <div className='text-center pb-3'>
            <h4 className='text-2xl font-bold'>Employee</h4>
          </div>
          <hr />
          <div className='py-3 d-flex justify-between'>
            <h5 className='text-lg font-semibold'>Total:</h5>
            <h5 className='text-lg font-semibold'>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 border shadow-sm w-25'>
          <div className='text-center pb-3'>
            <h4 className='text-2xl font-bold'>Salary</h4>
          </div>
          <hr />
          <div className='py-3 d-flex justify-between'>
            <h5 className='text-lg font-semibold'>Total:</h5>
            <h5 className='text-lg font-semibold'>{salaryTotal}</h5>
          </div>
        </div>
      </div>

      <div className='px-5 pt-3 mt-4'>
        <h4 className='text-2xl font-bold'>Admin Records</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td>{admin.email}</td>
                <td>
                  <Link to=''><Icon name='edit' className='edit text-primary cursor-pointer' /></Link>
                  <Icon name='trash' className='trash text-danger cursor-pointer' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home
