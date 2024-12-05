import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Loader } from 'semantic-ui-react'

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
      {/* <div className='2xl:p-3 xl:p-3 lg:p-2 md:p-1 sm:p-1 d-flex flex-wrap justify-content-around mt-3'>
        <div className='2xl:px-3 xl:px-3 lg:px-3 md:px-3 sm:px-2 border shadow-sm w-25'>
          <div className='text-center 2xl:pb-3 xl:pb-3 lg:pb-3 md:pb-3 sm:pb-3'>
            <h4 className='text-2xl md:text-2xl sm:text-sm font-bold'>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between items-center'>
            <h5 className='text-lg font-semibold'>Total:</h5>
            <h5 className='2xl:text-lg xl:text-lg lg:text-lg md:text-lg sm:text-sm font-semibold'>{adminTotal}</h5>
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
      </div> */}
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='md:mx-8 md:px-4 px-8 pt-2 py-6 border shadow-xl shadow-blue-200 rounded-xl text-white card'>
              <div className='text-center pb-3'>
                <h4 className='text-2xl font-bold'>Admin</h4>
              </div>
              <hr className='bg-white' />
              <div className='py-3 d-flex justify-between'>
                <h5 className='text-lg font-semibold'>Total:</h5>
                <h5 className='text-lg font-semibold'>{adminTotal}</h5>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='md:mx-8 md:px-4 px-8 pt-2 py-6 border shadow-xl shadow-blue-200 rounded-xl text-white card'>
              <div className='text-center pb-3'>
                <h4 className='text-2xl font-bold'>Employee</h4>
              </div>
              <hr className='bg-white' />
              <div className='py-3 d-flex justify-between'>
                <h5 className='text-lg font-semibold'>Total:</h5>
                <h5 className='text-lg font-semibold'>{employeeTotal}</h5>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='md:mx-8 md:px-4 px-8 pt-2 py-6 border shadow-xl shadow-blue-200 rounded-xl text-white card'>
              <div className='text-center pb-3'>
                <h4 className='text-2xl font-bold'>Salary</h4>
              </div>
              <hr className='bg-white' />
              <div className='py-3 d-flex justify-between'>
                <h5 className='text-lg font-semibold'>Total:</h5>
                <h5 className='text-lg font-semibold'>{salaryTotal}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className='row mt-20 mx-3'>
          <div className='col-md-12'>
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
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card md:flex justify-between items-center flex-row py-8 px-4'>
              <div className='left-side w-60 flex flex-col justify-between pr-4'>
                <h1 className='text-2xl text-white py-2'>Admin</h1>
                <hr className='bg-white' />
                <div className='md:flex justify-between py-2'>
                  <h5 className='text-lg font-semibold text-white'>Total:</h5>
                  <h5 className='text-lg font-semibold text-white'>{salaryTotal}</h5>
                </div>
              </div>
              <div className='right-side w-40 h-full rounded-full border border-white text-center align-middle items-center flex justify-center overflow-hidden'>
                <img src='https://cdn-icons-png.flaticon.com/512/9131/9131478.png' alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default Home
