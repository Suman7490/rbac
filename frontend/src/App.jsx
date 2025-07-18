import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Employee from './components/Employee'
import Category from './components/Category'
import Profile from './components/Profile'
import AddCategory from './components/AddCategory'
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'
import ProtectedRoute from './components/ProtectedRoute'
import EmployeeLogin from './components/EmployeeLogin'
import EmpDashboard from './components/EmpDashboard'
import EmpHome from './components/EmpHome'
import Roles from './components/Roles'
import AddRoles from './components/AddRoles'
import TeamHeadDashboard from './components/TeamHeadDashboard'
import TeamHeadHome from './components/TeamHeadHome'
import Permission from './components/Permission'
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          {/* Employee Login */}
          <Route path="/" element={<EmployeeLogin />} />

          {/* Admin Dashboard */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="employee" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Employee />
              </ProtectedRoute>
            } />
            <Route path="add_employee" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AddEmployee />
              </ProtectedRoute>
            } />
            <Route path="edit_employee/:id" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <EditEmployee />
              </ProtectedRoute>
            } />
            <Route path="category" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Category />
              </ProtectedRoute>
            } />
            <Route path="add_category" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AddCategory />
              </ProtectedRoute>
            } />
            <Route path="roles" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Roles />
              </ProtectedRoute>
            } />
            <Route path="add_role" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AddRoles />
              </ProtectedRoute>
            } />
            <Route path="permission" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Permission />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Profile />
              </ProtectedRoute>
            } />
          </Route>

          {/* Team Head Dashboard */}
          <Route path="/teamHeadDashboard" element={
            <ProtectedRoute allowedRoles={['Manager']}>
              <TeamHeadDashboard />
            </ProtectedRoute>
          }>
            <Route index element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <TeamHeadHome />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <Profile />
              </ProtectedRoute>
            } />
          </Route>

          {/* Employee Dashboard */}
          <Route path="/empdashboard" element={
            <ProtectedRoute allowedRoles={['Executive']}>
              <EmpDashboard />
            </ProtectedRoute>
          }>
            <Route index element={
              <ProtectedRoute allowedRoles={['Executive']}>
                <EmpHome />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute allowedRoles={['Executive']}>
                <Profile />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
