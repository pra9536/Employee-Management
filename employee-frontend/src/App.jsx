import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'
import EmployeeList from './components/EmployeeList'

function App(){
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<EmployeeList />}/>
          <Route path="/add-employee" element={<AddEmployee />}/>
          <Route path="/edit-employee/:id" element={<EditEmployee />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
