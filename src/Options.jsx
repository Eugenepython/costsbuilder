
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
      <button className = 'option' >
      <span role="img" aria-label="Telephone">📞</span>
     
    <span>Telephone</span>
      </button>
  </Link>

  <Link to= '/options/correspondence' >
      <button className = 'option'>
      <span role="img" aria-label="Writing">🖋️</span>
    <span>Correspondence</span>
    </button>
  </Link>

  <Link to= '/options/documents' >
      <button className = 'option'>
      <span role="img" aria-label="Reading">📖</span>
    <span>Documents</span>
      </button>

  </Link>

  <Link to= '/options/attendances' >
      <button className = 'option'>
      <span role="img" aria-label="Meeting">🤝</span>
    <span>Attendances</span>
      
      </button>
  </Link>

  <Link to= '/options/court' >
      <button className = 'option'>
      <span role="img" aria-label="Court">🏛️</span>
    <span>Court</span>
      </button>
  </Link>
      </div>
      <br></br>
      <br></br>


   <Link to="/">
  <button className = 'goHome' >Go to Home Page</button>
  </Link>

      </div>
  
      
    </>
  )
}

export default Options




  