import React, { useContext, useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard.js';
import '../styleSheets/Dashboard.css';
import EmployeeContext from '../contexts/EmployeeContext';

const Dashboard = () => {
  //consuming employee context
  const [employees,setEmployees,handleDelete]=useContext(EmployeeContext)

  const [searchId,setSearchId]=useState("");
  const [showEmployees,setShowEmployees]=useState([]);
  const [searching,setSearching]=useState(false);
  
  //feature to move back to dashboard
  const goBack=()=>{
    setSearching(false);
    setShowEmployees(employees);
  }

  //reflect change if data is added or deleted
  useEffect(()=>{
    setShowEmployees(employees);
  },[employees,setEmployees]);
  
  //searching data by id
  const handleSearch=()=>{
    setShowEmployees(employees.filter(employee=>employee["id"]===parseInt(searchId)));
    setSearching(true);
  };

  //Multi delete mode
  const [checkedItems,setCheckedItems]=useState([]);
  const [multiDeleteMode,setMultiDeleteMode]=useState(false);

  const addItem=(id)=>{
    setCheckedItems(prev=>[...prev,id]);    
  };
  const removeItem=(id)=>{
    setCheckedItems(checkedItems.filter(e=>e===id));
  };

  const handleMultiDelete=()=>{
    if(multiDeleteMode){
        if(checkedItems){
          setEmployees((prevItems) =>
            prevItems.filter((item) => !checkedItems.includes(item.id))
          );
          setCheckedItems([]);
        }
      }
    setMultiDeleteMode(prev=>!prev);
  }
  
  return (
    <div>

      {searching?<>
        <button onClick={goBack} className='goback'>
          <span class="material-symbols-outlined">
            arrow_back
          </span>
        </button>
      </>:<></>}

      <div className='search-container'>
       <input 
          type='text'
          value={searchId}
          placeholder='Search By ID'
          onChange={(e)=>setSearchId(e.target.value)}
       />
       <button className='search-btn' onClick={handleSearch}>
       🔍Search
       </button>
       <button 
        className='delete-multiple-btn'
        onClick={handleMultiDelete}
        >
        {multiDeleteMode?"Delete":"Delete Multiple"}
       </button>
      </div>

      
      <div className='employee-cards-header'>
        <h2 className='id-header'>ID</h2>
        <h2 className='name-header'>Name</h2>
        <h2 className='salary-header'>Salary</h2>
        <h2 className='age-header'>Age</h2>
      </div>
      <div className='employee-cards-container'>

        {showEmployees?showEmployees.map((employee)=>{
          return <EmployeeCard 
            key={employee["id"]}
            employee={employee}
            addItem={()=>addItem(employee["id"])}
            removeItem={()=>removeItem(employee["id"])}
            multiDeleteMode={multiDeleteMode}
            handleDelete={()=>handleDelete(employee["id"])}
           />
          } 
        ):""}
      </div>
    </div>
  )
}

export default Dashboard;
