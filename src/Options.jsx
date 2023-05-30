
import FindCase from './FindCase'
import {useState, useEffect, useContext} from 'react' 
import MyContext from './Context';
import { Link } from 'react-router-dom';


function Options() {

  
  const { newObject, history } = useContext(MyContext);


  
  return (
    <>
    
      <div className = 'options'>
     <p>{newObject.claimant} v {newObject.defendant}</p>
      <p>Click on the action below</p>

<div className = 'optionsButtons'>
      <Link to= '/options/telephone' >
      <button className = 'option'>Telephone</button>
  </Link>

  <Link to= '/options/correspondence' >
      <button className = 'option'>Correspondence</button>
  </Link>

  <Link to= '/options/documents' >
      <button className = 'option'>Documents</button>
  </Link>

  <Link to= '/options/attendances' >
      <button className = 'option'>Attendances</button>
  </Link>

  <Link to= '/options/court' >
      <button className = 'option'>Court attendance</button>
  </Link>
      </div>
      <br></br>
      <br></br>
  <Link to="/">
  <button className = 'option'>Go to Home Page</button>
  </Link>

      </div>
  
      
    </>
  )
}

export default Options




  