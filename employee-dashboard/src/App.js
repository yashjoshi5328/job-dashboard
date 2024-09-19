import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.js';
import EmployeeDetail from './pages/EmployeeDetails';
import EmployeeContext from './contexts/EmployeeContext.js';
import './App.css';

function App() {
  //State for employee data
  const [employees,setEmployees]=useState([]);

  //fetching data
  useEffect(()=>{
    fetch(`https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001`)
    .then((res)=>{return res.json()})
    .then((res)=>setEmployees(res))
    .catch((e)=>{
      console.log(`Issue while fetching Employee Data : ${e}`);
    })
  },[]);

  //function to delete any data
  const handleDelete=(id)=>{
    setEmployees(employees.filter(employee=>employee["id"]!==id));
  }

  return (
    //Providing context to {Dashboard and EmployeeDetail page}
    <EmployeeContext.Provider value={[employees,setEmployees,handleDelete]}>
      
      <header>
        <h1>Employee Dashboard</h1>
      </header>

      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:id" element={<EmployeeDetail />} />
        </Routes>
      </Router>

    </EmployeeContext.Provider>
  );
}

export default App;