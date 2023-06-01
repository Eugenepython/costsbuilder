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
  const [disabled, setDisabled] = useState(false)



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
  
function clickClaimant() {
  const inputElement = document.getElementById('cInput'); // Get the input element by class name or use an appropriate selector
  const claimantValue = inputElement.value;
  const capitalizedString = capitalizeFirstLetter(claimantValue);
  setClaimant(capitalizedString);
  setIsClaimant(true);
  inputElement.value = ''; // Clear the input box
}

function clickDefendant() {
  const inputElement = document.getElementById('dInput'); // Get the input element by class name or use an appropriate selector
  const defendantValue = inputElement.value;
  const capitalizedString = capitalizeFirstLetter(defendantValue);
  setDefendant(capitalizedString);
  setIsDefendant(true);
  inputElement.value = ''; // Clear the input box
}


function handleClaimant(event){
  console.log(event.target.value)
  console.log("claimant")
  const capitalizedString = capitalizeFirstLetter(event.target.value);
  if (event.keyCode === 13) {
    //console.log(event.target.value)
    const capitalizedString = capitalizeFirstLetter(event.target.value);
    setClaimant(capitalizedString)
    event.target.value = ''
    setIsClaimant(true)
  }
}


function handleDefendant(event){
  console.log("defendant")
  if (event.keyCode === 13 || event.type === 'click') {
    //console.log(event.target.value)
    const capitalizedString = capitalizeFirstLetter(event.target.value);
    setDefendant(capitalizedString)
    event.target.value = ''
    setIsDefendant(true)
  }
}

function saveCase(){
  setDisabled(true)
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
      <div className = 'newCase'>
 
      <p>New Case</p>

    <p>enter in details of new case</p>



<div>
<input disabled={disabled} id = 'cInput' className = 'input'   placeholder="claimant" onKeyUp={handleClaimant}></input>
<button disabled={disabled}  onClick={() => clickClaimant()}>&#x2611;</button>

</div>

<div><input disabled={disabled}  id = 'dInput' className = 'input' placeholder="defendant" onKeyUp={handleDefendant}></input>
<button disabled={disabled}  onClick ={() => clickDefendant()}>&#x2611;</button></div>

<p>Claimant : {claimant}</p>
<p>Defendant : {defendant}</p>
<p>Reference : {ref}</p>

<button className = 'newCaseBtns' style = {{display: isClaimant && isDefendant && generate ? 'block' : 'none'}} onClick = {geneRate}>Generate reference</button>

<button style = {{display: happyDetails ? 'block' : 'none'}} className = 'newCaseBtns' onClick = {saveCase} >Happy with details?</button>

<button className = 'newCaseBtns' style = {{display: happyToGo ? 'block' : 'none'}} onClick = {conFirm}>Confirm</button>

<div className = 'placeholder' style = {{display : details ? 'block' : 'none'}}>
<p>Case created as below</p>
<p>Claimant : {newEntry.claimant}</p>
<p>Defendant : {newEntry.defendant}</p>
<p>Reference : {newEntry.reference}</p>


</div>

<Link to="/">
  <button className = 'goHome' >Go to Home Page</button>
  </Link>

      </div>
  
      
    </>
  )
}

export default NewCase
