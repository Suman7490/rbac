import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:8081/auth/verifytoken');
        if (response.status === 200) {
          setUserRole(response.data.role);
          // console.log(setUserRole(response.data.role));

        } else {
          setUserRole(null);
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole(null);
        navigate('/');
      }
    };
    fetchUserRole();
  }, [navigate]);

  const handleLogout = () => {
    axios.get('http://localhost:8081/auth/logout')
      .then(result => {
        if (result.data.Status) {
          navigate('/')
        }
      })
  }
  return (
    <>
      

      <div className='grid grid-cols-12'>
        <div className='sidebar h-[100%] col-span-1 sm:col-span-2'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-1 sm:px-3 pt-2 text-white min-vh-100'>
            <Link
              to="/dashboard"
              className='pb-3 text-white text-decoration-none'>
              <span className='fs-5 fw-bolder d-sm-inline'>
                My Logo
              </span>
            </Link>
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 w-100 align-items-center' id="menu">
              {userRole === 'Admin' && (
                <>
                  <li className='w-100 hover:bg-slate-500 active:bg-slate-500 rounded px-auto'>
                    <Link to="/dashboard" className='nav-link text-white px-0 align-middle'>
                      <i className="tachometer alternate px-2 icon teal"></i>
                      <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                    </Link>
                  </li>
                  <li className='w-100 hover:bg-slate-500 active:bg-slate-500 rounded px-auto'>
                    <Link
                      to="/dashboard/employee"
                      className='nav-link text-white px-0 align-middle'>
                      <i className="users icon alternate px-2 icon teal"></i>
                      <span className='ms-2 d-none d-sm-inline'>Employees</span>
                    </Link>
                  </li>
                  <li className='w-100 hover:bg-slate-500 active:bg-slate-500 rounded px-auto'>
                    <Link
                      to="/dashboard/category"
                      className='nav-link text-white px-0 align-middle'>
                      <i className="columns icon alternate px-2 icon teal"></i>
                      <span className='ms-2 d-none d-sm-inline'>Category</span>
                    </Link>
                  </li>
                  <li className='w-100 hover:bg-slate-500 active:bg-slate-500 rounded px-auto'>
                    <Link
                      to="/dashboard/roles"
                      className='nav-link text-white px-0 align-middle'>
                      <i className="columns icon alternate px-2 icon teal"></i>
                      <span className='ms-2 d-none d-sm-inline'>Roles</span>
                    </Link>
                  </li>
                  <li className='w-100 hover:bg-slate-500 active:bg-slate-500 rounded px-auto'>
                    <Link
                      to="/dashboard/permission"
                      className='nav-link text-white px-0 align-middle'>
                      <i className="columns icon alternate px-2 icon teal"></i>
                      <span className='ms-2 d-none d-sm-inline'>Permission</span>
                    </Link>
                  </li>
                  <li className='w-100 hover:bg-slate-500 active:bg-slate-500 rounded px-auto'>
                    <Link
                      to="/dashboard/profile"
                      className='nav-link text-white px-0 align-middle'>
                      <i className="user icon alternate px-2 icon teal"></i>
                      <span className='ms-2 d-none d-sm-inline'>Profile</span>
                    </Link>
                  </li>
                  <li className='w-100 hover:bg-slate-500 active:bg-slate-500 rounded px-auto' onClick={handleLogout}>
                    <Link
                      className='nav-link text-white px-0 align-middle'>
                      <i className="power off icon alternate px-2 icon teal"></i>
                      <span className='ms-2 d-none d-sm-inline'>Logout</span>
                    </Link>
                  </li>
                </>
              )}

            </ul>
            <div className='text-white text-left'>
              <p>Bottom Text</p>
            </div>
          </div>
        </div>
        <div className='h-[100%] col-span-11 sm:col-span-10 main'>
          <div className='p-2 d-flex justify-between shadow'>
            <div className=''>
              <h2 className='md:text-2xl font-extrabold py-2 text-violet-800'>Employee Management System</h2>
            </div>
            <div className='flex justify-center items-center'>
              <div className='pr-2 text-right flex flex-col'>
                <span className='text-sm pt-0 pb-0 text-violet-800'>User Name</span>
                <span className='text-violet-800 text-xs pb-0 pt-0'>Role</span>
              </div>
              <div className='w-[40px] h-[40px] rounded-full bg-violet-700 text-white flex justify-center items-center'>
                <span><i className="user alternate icon white" style={{ fontSize: '1.6em', paddingLeft: '4px', marginBottom: '12px' }}></i></span>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>


    </>
  )
}

export default Dashboard
