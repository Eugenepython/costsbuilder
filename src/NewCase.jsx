//import data from './CasesLibrary'
import {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import MyContext from './Context';


let numbers = [];
for (let i = 1000; i <= 9999; i++) {
  numbers.push(i);
}
//console.log(numbers.length)

//console.log(numbers)
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


function checkAndStoreSubKey(key, subKey, array) {
  const existingItem = localStorage.getItem(key);
  if (!existingItem) {
    localStorage.setItem(key, JSON.stringify([array]));
    console.log('Array stored in local storage.');
  } else {
    const parsedData = JSON.parse(existingItem);
    const exists = parsedData.some(item => item[subKey] === array[subKey]);
    if (!exists) {
      parsedData.push(array);
      localStorage.setItem(key, JSON.stringify(parsedData));
      console.log('Item added to local storage.');
    } else {
      console.log('Item already exists in local storage.');
    }
  }
}


function NewCase({updateData}) {
  const { setNewEntry, newEntry, theData } = useContext(MyContext);
  const [claimant, setClaimant] = useState('')
  const [defendant, setDefendant] = useState('')
  const [ref, setRef] = useState('')
  const [isClaimant, setIsClaimant] = useState(false)
  const [isDefendant, setIsDefendant] = useState(false)
  const [happyToGo, setHappyToGo] = useState(false)
  const [generate, setGenerate] = useState(true)
  const [happyDetails, setHappyDetails] = useState(false)
  const [details, setDetails] = useState(false)
 

function geneRate(){
  setGenerate(false)
  setHappyDetails(true)
  //console.log(data)
  //console.log(data.data[0].reference)
  const readyRefs = theData.map((x) => x.reference)
  const takenThings = readyRefs.map((x) => x.slice(2))
  const takenNums = takenThings.map((x) => Number(x))
  //console.log(takenNums)
  for (let a = 0; a < takenNums.length; a++){
    const takenNum = takenNums[a]
    for(let b = 0; b < numbers.length; b++){
      if (numbers[b] === takenNum){
        numbers.splice(b,1)
      }
    }
  }
  //console.log(numbers.length)
  const randomNum = Math.floor(Math.random() * numbers.length)
  //console.log(randomNum)
  let newRef= 'XY' + numbers[randomNum]
  //console.log(newRef)
  setRef(newRef)
}
  
function handleClaimant(event){
  if (event.keyCode === 13) {
    //console.log(event.target.value)
    const capitalizedString = capitalizeFirstLetter(event.target.value);
    setClaimant(capitalizedString)
    event.target.value = ''
    setIsClaimant(true)
  }
}

function handleDefendant(event){
  if (event.keyCode === 13) {
    //console.log(event.target.value)
    const capitalizedString = capitalizeFirstLetter(event.target.value);
    setDefendant(capitalizedString)
    event.target.value = ''
    setIsDefendant(true)
  }
}

function saveCase(){
  //console.log(ref)
  setHappyDetails(false)
  setHappyToGo(true)
  //setRef(false)
  setNewEntry({
    'claimant': claimant,
    'defendant': defendant,
    'reference': ref,  
  })
  
  
}
//const [showDetails, setShowDetails] = useState(false)
function conFirm(){
  setDetails(true)
 setHappyToGo(false)
  setIsClaimant(false)
  setIsDefendant(false)
  
  setClaimant('')
  setDefendant('')
  setRef('')
  checkAndStoreSubKey('data', 'reference', newEntry);
  updateData([...theData, newEntry]);
}

//console.log(newEntry)
//console.log(theData)

  return (
    <>
      <div>
 
      <p>New Case</p>

    <p>enter in details of new case</p>

<input placeholder="claimant" onKeyDown={handleClaimant}></input>
<input placeholder="defendant" onKeyDown={handleDefendant}></input>

<p>Claimant : {claimant}</p>
<p>Defendant : {defendant}</p>
<p>Reference : {ref}</p>

<button style = {{display: isClaimant && isDefendant && generate ? 'block' : 'none'}} onClick = {geneRate}>Generate reference</button>

<div style = {{display: happyDetails ? 'block' : 'none'}} ><button onClick = {saveCase} style = {{display: ref ? 'block' : 'none'}}>Happy with details?</button></div>

<button style = {{display: happyToGo ? 'block' : 'none'}} onClick = {conFirm}>Confirm</button>

<div className = 'placeholder' style = {{display : details ? 'block' : 'none'}}>
<p>Case created as below</p>
<p>Claimant : {newEntry.claimant}</p>
<p>Defendant : {newEntry.defendant}</p>
<p>Reference : {newEntry.reference}</p>


</div>

<Link to="/">
  <button  >Go to Home Page</button>
  </Link>

      </div>
  
      
    </>
  )
}

export default NewCase
