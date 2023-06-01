
import FindCase from "./FindCase"
import MyContext from './Context';
import {useContext} from 'react'
import { Link } from 'react-router-dom';


function History() {

    const { newObject, history } = useContext(MyContext);
  console.log(newObject)
    console.log(history)
    //console.log(newObject)

const theHeadings = (
<div className = 'gridRow'>
<div className = 'date'>date</div>
<div className = 'method'>method</div>
<div className = 'correspondent'>Correspondent</div>
<div className ='time'>Time</div>
<div className = 'phase'>Phase</div>
<div className = 'subjectMatter'>Subject Matter</div>
</div>
)


const theLedger = history.map((x) => {
    return (
        <>
        <div className = 'gridRow'>
        <div className = 'date'>{x.date}</div>
        <div className = 'method'>{x.method}</div>
        <div className = 'correspondent'>{x.correspondent}</div>
        <div className ='time'>{x.time}</div>
        <div className = 'phase'>{x.phase}</div>
        <div className = 'subjectMatter'>{x.subjectMatter}</div>
        </div>
        </>
    )
})

function reTurn(){
    console.log("return")
}

    return (
      <>
        <div>
            <h1>Case History</h1>
            <p>{newObject.reference}</p>
            <p>{newObject.claimant} v {newObject.defendant}</p>
            <Link to= '/case' >
            <button onClick={reTurn}>Return</button>
        </Link>            
      {theHeadings}
      {theLedger}
     
        </div>
    
      </>
    )
  }
  
  export default History