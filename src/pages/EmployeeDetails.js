import React, { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../contexts/EmployeeContext'
import { useNavigate, useParams } from 'react-router-dom';
import '../styleSheets/EmployeeDetails.css';

const EmployeeDetails = () => {

  //consuming context to retrieve employee data
  const [employees,,handleDelete]=useContext(EmployeeContext);
  
  //extracting id from params
  const {id}=useParams();

  //for navigating back to the dashboard
  const navigate=useNavigate();

  //temporary storing data to employee
  const [employee]=(employees && employees.filter((employee)=>employee["id"]===parseInt(id)))||[];
  
  const [firstName,setFirstName]=useState(employee?employee.firstName:"Please redirect from main page");
  const [lastName,setLastName]=useState(employee?employee.lastName:"Please redirect from main page");
  const [email,setEmail]=useState(employee?employee.email:"Please redirect from main page");
  const [contact,setContact]=useState(employee?employee.contactNumber:"Please redirect from main page");
  const [age,setAge]=useState(employee?employee.age:"Please redirect from main page");
  const [address,setAddress]=useState(employee?employee.address:"Please redirect from main page");
  const [salary,setSalary]=useState(employee?employee.salary:"Please redirect from main page");
  const [dob,setDob]=useState(employee?employee.dob:"Please redirect from main page");
  const imageUrl=employee?employee.imageUrl:"";

  useEffect(()=>{
    if(employee){
      employee.firstName=firstName;
      employee.lastName=lastName;
      employee.email=email;
      employee.age=age;
      employee.contact=contact;
      employee.address=address;
      employee.salary=salary;
      employee.dob=dob;
    }
  },[firstName,lastName,email,contact,age,address,salary,dob,employee]);
  const [edit,setEdit]=useState(true);

  return( 
    <>
      <button 
        onClick={()=>{
          navigate('/')
        }} 
        className='goback'
      >
        <span className="material-symbols-outlined">
          arrow_back
        </span>
      </button>

      <div className="employee-details">

        <div className='employee-photo'>
          <img src={imageUrl} alt="error"/>
        </div>

        <div className='employee-data'>
          <label>ID: 
            <input type="text" value={id} readOnly/>
          </label>
          <label>First Name: 
            <input 
              type="text"
              value={firstName} 
              readOnly={edit}
              onChange={(e)=>setFirstName(e.target.value)}
            />
          </label>
          <label>Last Name: 
            <input 
              type="text"
              value={lastName} 
              readOnly={edit}
              onChange={(e)=>setLastName(e.target.value)}
            />
          </label>
          <label>Email: 
            <input 
              type="text"
              value={email} 
              readOnly={edit}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </label>
          <label>Age: 
            <input 
              type="text"
              value={age} 
              readOnly={edit}
              onChange={(e)=>setAge(e.target.value)}
            />
          </label>
          <label>Dob: 
            <input 
              type="text"
              value={dob} 
              readOnly={edit}
              onChange={(e)=>setDob(e.target.value)}
            />
          </label>
          <label>Contact No.: 
            <input 
              type="text"
              value={contact} 
              readOnly={edit}
              onChange={(e)=>setContact(e.target.value)}
            />
          </label>  
          <label>Email: 
            <input 
              type="text"
              value={email} 
              readOnly={edit}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </label>
          <label>Salary (in thousand): 
            <input 
              type="text"
              value={salary} 
              readOnly={edit}
              onChange={(e)=>setSalary(e.target.value)}
            />
          </label> 
          <label>Address: 
            <input 
              type="text"
              value={address} 
              readOnly={edit}
              onChange={(e)=>setAddress(e.target.value)}
            />
          </label>   
        </div>
      </div>

      <div className='btn-area'>

        <button className='edit-btn'
          onClick={()=>{
            if(edit===false){
              navigate('/');
            }
            setEdit(!edit);
          }}     
        >{!edit?"Update":"Edit"}</button>

        <button className='delete-btn'
          onClick={(e)=>{
            handleDelete(employee.id);
            navigate('/');
          }}
        >
          <span className="material-symbols-outlined">
              delete
          </span>
        </button>
        
      </div>
    </>
    
  )
}

export default EmployeeDetails
