import React, { useState } from 'react'
import '../styleSheets/EmployeeCard.css'
import { useNavigate } from 'react-router-dom'

const EmployeeCard = ({employee,addItem,removeItem,multiDeleteMode,handleDelete}) => {
  const navigate=useNavigate();
  const [checked,setChecked]=useState(false);

  //redirecting to open open Employee full detail(EmployeeDetails.js)
  const viewDetails=()=>{
    navigate(`/${employee["id"]}`);
  }

  //Multi-delete check function
  const handleCheck=(id)=>{
    if(!checked){
      addItem(id);
    }else{
      removeItem(id);
    }
    setChecked((prev)=>!prev);
  }

  return (
    <div style={{'borderColor':checked?'red':'black'}}
      className='employee-card'
      onClick={multiDeleteMode?null:viewDetails}  
    >

      <h4 className='id-field'>
        {`${employee["id"]}`}
      </h4>
      <p className='name-field'>
        <img src={employee["imageUrl"]} className='image-field' alt='error'/>
        {`${employee["firstName"]} ${employee["lastName"]}`}
      </p>
      <p className='salary-field'>
        {`${employee["salary"]}`}0000
      </p>
      <p className='age-field'>
        {`${employee["age"]}`}
      </p>

      {multiDeleteMode?
        <input 
          type="checkbox"
          className='check-btn'
          onClick={(e)=>{
            e.stopPropagation();
            handleCheck(employee.id)
          }}  
        />
      :(<button
          onClick={(e)=>{
            e.stopPropagation();
            handleDelete(employee.id);
          }}
        >
        <span className="material-symbols-outlined">
          delete
        </span>
      </button>)}
    </div>
  )
}

export default EmployeeCard
