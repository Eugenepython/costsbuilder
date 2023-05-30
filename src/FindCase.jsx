

import { Link } from 'react-router-dom';
import readyData from './CasesLibrary'
import {useState, useContext, useEffect} from 'react'
import MyContext from './Context';
import NewCase from './NewCase'


function capitalizeFirstLetter(str) {
  if (str)
  {  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}}

function FindCase({updateData}) {

  const { setNewObject, setHistory, theData } = useContext(MyContext);

let storedData = []

if (localStorage.getItem('data')) {
  storedData = [... readyData.readyData, ...JSON.parse(localStorage.getItem('data'))]
} else {
  storedData = readyData.readyData
}


  console.log(storedData)
  //console.log("hi there everyone")
  
const [theValue, setTheValue] = useState('')
const [file, setFile] = useState({})
const [myFiles, setMyFiles] = useState([])
const [displayFiles, setDisplayFiles] = useState(false)



function matchData(event){
  const enteredValue = capitalizeFirstLetter(event.target.value);
  setTheValue(enteredValue);
}

useEffect(() => {
  //console.log(data[8].claimant)
for (let i=0; i < storedData.length; i++){
  const claimant = capitalizeFirstLetter(storedData[i].claimant);
    const defendant = capitalizeFirstLetter(storedData[i].defendant);
    const reference = storedData[i].reference;
  //console.log(theValue)
  //console.log(data[i].claimant)
  if (theValue === claimant || theValue === defendant || theValue === reference) {
  const matchedFile = storedData[i]
  setFile(matchedFile)
  //console.log(file)
  } }
},[theValue])



const handleClick = (x) => {
  setNewObject(x);
};

useEffect(() => {
  if (file.reference) {
    showHistory(file.reference);
  }
}, [file]);


function showHistory(y,z) {
  setNewObject(z);
  //console.log(y);
  //let data = JSON.parse(localStorage.getItem('data'));
  //console.log(data);
  storedData.forEach(y => {
    if (y.reference === file.reference) {
      //console.log(y)
      const numberKeys = Object.keys(y).filter(key => !isNaN(key));
      const emptyHistory = []
      //console.log(numberKeys[0])
      for (let i =0; i < numberKeys.length; i++){
        //console.log(y[numberKeys[i]])
        emptyHistory.push(y[numberKeys[i]])
        //console.log(emptyHistory)
        setHistory(emptyHistory)
        //console.log(history)
      }
    }
    })    
}

function showFiles(){
  //let data = JSON.parse(localStorage.getItem('data'));
  console.log(storedData[2].claimant)
  const theFiles = storedData.map((x) => {
    return (
  <p>{x.reference}  {x.claimant} -v- {x.defendant}</p>
    )
  })
  console.log(theFiles)
  setMyFiles(theFiles)
  setDisplayFiles(true)
  }

  function hideFiles(){
    setDisplayFiles(false)
  }


    return (
        <div className = 'findCase'>
      <p>Enter the case reference number, or the surname of the Claimant or Defendant</p>
      <form onSubmit={() => setFile(theValue)}>
      <textarea 
      value = {theValue}
      onChange = {matchData}
      >
      </textarea>
      
      <div>
        <p>claimant : {file.claimant}</p>
        <p> defendant: {file.defendant}</p>
        <p> reference: {file.reference}</p>
      </div>

      {file.reference ? (
  <Link to= '/options' >
   <button onClick={() => handleClick(file)}>Proceed to add time</button>
  </Link>
) : ''}

      </form>

      {file.reference ? (
      <Link to= '/history' >
      <button onClick={() => showHistory(file.reference, file)}>Show case file</button>
        </Link>
      ) : ''}
 
    <div style = {{display : displayFiles ? 'none' : 'block'}}><button onClick = {showFiles}>Display your files</button></div>
        <div style = {{display : displayFiles ? 'block' : 'none'}}><button onClick = {hideFiles}>Hide your files</button></div>
        <div className = 'filesDisplay' style = {{display : displayFiles ? 'block' : 'none'}}> {myFiles}   </div>
          

        <Link to="/">
  <button >Go to Home Page</button>
  </Link>
        </div>
    )
  }
  export default FindCase
