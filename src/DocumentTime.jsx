import { useState, useContext, useEffect  } from 'react'
import MyContext from './Context';
import { getItemFromLocalStorage, updateItemInLocalStorage } from './localStorageUtils';
import { Link } from 'react-router-dom';


function DocumentTime() {

const { setNewObject, newObject } = useContext(MyContext);

const [time, setTime] = useState(0)
const [displayTimeLength, setDisplayTimeLength] = useState(true)
const [displayCorrespondence, setDisplayCorrespondence] = useState(false)
const [correspondent, setCorrespondent] = useState('')
const [displaySubjectMatter, setDisplaySubjectMatter] = useState(false)
const [subjectMatter, setSubjectMatter] = useState('')
const [displayPhase, setDisplayPhase] = useState(false)
const [phase, setPhase] = useState('')
const [displayDate, setDisplayDate] = useState(false)
const [finished, setFinished] = useState(false)
const currentDate = new Date().toISOString().slice(0, 10); 
const [dateValue, setDateValue] = useState(currentDate);

const thePhases = ['initial statements of case', 'issue/statements of case', 'disclosure', 'witness statements', 'expert reports', 'CMC', 'PTR', 'trial preparation', 'trial', 'settlement'] 
const theButtons = thePhases.map((item) => <button onClick={() => handleClick(item)}>Phase: {item}</button>);

const firstKeyPress = (event) => {
    if (event.key === 'Enter') {
      const value = event.target.value;
      setTime(value);
      event.target.value = ''; // Reset the input field
        setDisplaySubjectMatter(true)
        setDisplayTimeLength(false)
    }
  };


const thirdKeyPress = (event) => {
    if (event.key === 'Enter') {
        const value = event.target.value;
        setSubjectMatter(value);
        event.target.value = ''; // Reset the input field
         setDisplayPhase(true)
         setDisplaySubjectMatter(false)
      }
    };

const fourthKeyPress = (event) => {
      if (event.key === 'Enter') {
         setDisplayDate(false)
         setFinished(true)
         }
        };

function handleClick(x){
    setPhase(x)
    setDisplayPhase(false)
    setDisplayDate(true)
}
const handleDateChange = (event) => {
    setDateValue(event.target.value);
    };

    function submitButton(){
        const uniqueId = Date.now();
            const storedObject = getItemFromLocalStorage('data');  
            const updatedObject = storedObject.map(item => {
                if (item.reference === newObject.reference) {
                    return {
                    ...item, 
                    [uniqueId]:{
                    method: 'documents',
                    date: dateValue,
                    time: time,
                    correspondent: '--',
                    subjectMatter: subjectMatter,
                    phase: phase,
                }
            } 
        } return item
            });
            //console.log(storedObject)
            //console.log(updatedObject)
            updateItemInLocalStorage('data', updatedObject);
    }

return (
        <div className = 'documents'>
 
  <p>{newObject.reference}</p>
  <p>{newObject.claimant} v {newObject.defendant}</p>

  <div style={{ display: displayTimeLength ? 'block' : 'none' }}>
<p>How long did it take you to consider these documents and issues?</p>
  <input type="number" placeholder="minutes" onKeyDown={firstKeyPress}/>
  </div>

<div style={{ display: displaySubjectMatter ? 'block' : 'none' }} >What were you considering or analysing and what was it about? 
<input type="text" placeholder="subject matter" onKeyDown={thirdKeyPress}/>
<p>{subjectMatter}</p></div>

<div style={{ display: displayPhase ? 'block' : 'none' }} >What phase do you consider this would fall into?
{theButtons}
</div>

<div style={{ display: displayDate ? 'block' : 'none' }} >What date did this happen?
<input type="date" value={dateValue} onChange={handleDateChange} onKeyDown={fourthKeyPress} />
</div>


<p>Time : {time}  minutes</p>
<p>Subject matter : {subjectMatter}</p>
<p>Phase : {phase}</p>
<p>Date : {dateValue}</p>

<div style = {{display: finished ? 'block' : 'none'}}>
<Link to="/case">
  <button onClick={() => submitButton()}>Submit</button>
  </Link>
  </div>
  <Link to= '/options' >
   <button >Go back to options</button>
  </Link>
    </div>
       
    )
  }

  export default DocumentTime

  