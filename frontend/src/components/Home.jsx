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
   

     
      <div className='my-4 sm:mx-12 mx-4'>
        <div className='grid grid-cols-12 gap-8'>
          <div className='col-span-12 md:col-span-3'>
            <div className='md:px-4 pt-2 py-6 border border-violet-800 rounded-xl text-violet-800 shadow shadow-violet-800'>
              <div className='text-center pb-3'>
                <h4 className='sm:text-2xl text-base font-bold'>Admin</h4>
              </div>
              <hr className='bg-violet-800' />
              <div className='py-3 md:px-1 sm:px-4 flex justify-between'>
                <h5 className='text-sm sm:text-lg font-semibold'>Total:</h5>
                <h5 className='text-sm sm:text-lg font-semibold'>{adminTotal}</h5>
              </div>
            </div>
          </div>
          <div className='col-span-12 md:col-span-3'>
            <div className='md:px-4 pt-2 py-6 border border-violet-800 rounded-xl text-violet-800 shadow shadow-violet-800'>
              <div className='text-center pb-3'>
                <h4 className='text-2xl font-bold'>Employee</h4>
              </div>
              <hr className='bg-violet-800' />
              <div className='py-3 md:px-1 sm:px-2 flex justify-between'>
                <h5 className='text-lg font-semibold'>Total:</h5>
                <h5 className='text-lg font-semibold'>{employeeTotal}</h5>
              </div>
            </div>
          </div>
          <div className='col-span-12 md:col-span-3'>
            <div className='md:px-4 pt-2 py-6 border border-violet-800 rounded-xl text-violet-800 shadow shadow-violet-800'>
              <div className='text-center pb-3'>
                <h4 className='text-2xl font-bold'>Salary</h4>
              </div>
              <hr className='bg-violet-800' />
              <div className='py-3 md:px-1 sm:px-2 flex justify-between'>
                <h5 className='text-lg font-semibold'>Total:</h5>
                <h5 className='text-lg font-semibold'>{salaryTotal}</h5>
              </div>
            </div>
          </div>
          <div className='col-span-12 md:col-span-3'>
            <div className='md:px-4 pt-2 py-6 border border-violet-800 rounded-xl text-violet-800 shadow shadow-violet-800'>
              <div className='text-center pb-3'>
                <h4 className='text-2xl font-bold'>Admin</h4>
              </div>
              <hr className='bg-violet-800'/>
              <div className='py-3 md:px-1 sm:px-2 flex justify-between'>
                <h5 className='text-lg font-semibold'>Total:</h5>
                <h5 className='text-lg font-semibold'>{adminTotal}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className='rounded-xl p-2 grid grid-cols-12 gap-4 mt-10'>
          {/* <div className='col-span-12 md:col-span-6'>
            <div className='card md:flex justify-between items-center flex-row py-8 px-4 rounded-xl'>
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

          <div className='col-span-12 md:col-span-6'>
            <div className='card md:flex justify-between items-center flex-row py-8 px-4 rounded-xl'>
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
          </div> */}
          <div className='col-span-12'>
            <div className='pt-3 mt-4'>
              <h4 className='text-2xl font-bold text-violet-800'>Admin Records</h4>
              <table className='table text-violet-800 w-full'>
                <thead className='text-violet-800'>
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
        </div>

        <div className='grid grid-cols-12 gap-4 mt-10'>
          <div className='col-span-12 md:col-span-4'>
            <div className='card md:flex justify-between items-center flex-row py-8 px-4 rounded-xl'>
              <div className='right-side w-40 h-full rounded-full border border-white text-center align-middle items-center flex justify-center overflow-hidden'>
                <img src='https://cdn-icons-png.flaticon.com/512/9131/9131478.png' alt='' />
              </div>
              <div className='left-side w-60 flex flex-col justify-between pr-4'>
                <h1 className='text-2xl text-white py-2'>Admin</h1>
                <hr className='bg-white' />
                <div className='md:flex justify-between py-2'>
                  <h5 className='text-lg font-semibold text-white'>Total:</h5>
                  <h5 className='text-lg font-semibold text-white'>{salaryTotal}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-12 md:col-span-4'>
            <div className='card md:flex justify-between items-center flex-row py-8 px-4 rounded-xl'>
              <div className='right-side w-40 h-full rounded-full border border-white text-center align-middle items-center flex justify-center overflow-hidden'>
                <img src='https://cdn-icons-png.flaticon.com/512/9131/9131478.png' alt='' />
              </div>
              <div className='left-side w-60 flex flex-col justify-between pr-4'>
                <h1 className='text-2xl text-white py-2'>Admin</h1>
                <hr className='bg-white' />
                <div className='md:flex justify-between py-2'>
                  <h5 className='text-lg font-semibold text-white'>Total:</h5>
                  <h5 className='text-lg font-semibold text-white'>{salaryTotal}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-12 md:col-span-4'>
            <div className='card md:flex justify-between items-center flex-row py-8 px-4 rounded-xl'>
              <div className='right-side w-40 h-full rounded-full border border-white text-center align-middle items-center flex justify-center overflow-hidden'>
                <img src='https://cdn-icons-png.flaticon.com/512/9131/9131478.png' alt='' />
              </div>
              <div className='left-side w-60 flex flex-col justify-between pr-4'>
                <h1 className='text-2xl text-white py-2'>Admin</h1>
                <hr className='bg-white' />
                <div className='md:flex justify-between py-2'>
                  <h5 className='text-lg font-semibold text-white'>Total:</h5>
                  <h5 className='text-lg font-semibold text-white'>{salaryTotal}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default Home
