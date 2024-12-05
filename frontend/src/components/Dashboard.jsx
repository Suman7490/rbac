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
      <div className='container-fluid'>
        <div className='row flexd-nowrap'>
          <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar'>
            <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
              <Link
                to="/dashboard"
                className='pb-3 mb-md-1 me-md-auto text-white text-decoration-none'>
                <span className='fs-5 fw-bolder d-none d-sm-inline'>
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
                        {/* <span className='text-center rounded' style={{ background: '#67ACFF' }}>
                          <i className="users icon alternate px-2 icon white"></i>
                        </span> */}
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
          <div className='col p-0 m-0'>
            <div className='p-2 d-flex justify-content-center shadow sidebar'>
              <h4 className='md:text-xl font-bold py-2 text-white'>Employee Management System</h4>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
