
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './Home'
import FindCase from './FindCase'
import Options from './Options'
import MyContext from './Context';
import Telephone from './Telephone'
import History from './History'
import {useState, useEffect} from 'react'
import Correspondence from './Correspondence'
import DocumentTime from "./DocumentTime";
import PersonalAttendance from "./PersonalAttendance";
import CourtAttendance from "./CourtAttendance";
import NewCase from "./NewCase";
import readyData from './CasesLibrary.jsx';
import { getItemFromLocalStorage, updateItemInLocalStorage } from './localStorageUtils';

import './App.css'

function App() {
  const [theData, setData] = useState(readyData.readyData)
  const [newObject, setNewObject] = useState({});
  const [history, setHistory] = useState([]);
  const [newEntry, setNewEntry] = useState({})

  function updateData(y){
  setData(y)
  }

  return (
    <MyContext.Provider value={{ newObject, setNewObject, setHistory, history, setNewEntry, newEntry, theData, setData }}>
    <BrowserRouter>
      <div>
      <Link className="site-logo" to="/">Costs Builder!</Link>
      
             </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case" element={<FindCase updateData = {updateData}/>} />
        <Route  path="/history" element={<History />}/>
        <Route  path="/options" element={<Options />}/>
        <Route  path="/options/telephone" element={<Telephone />}/>
        <Route  path="/options/correspondence" element={<Correspondence />}/>
        <Route  path="/options/documents" element={<DocumentTime />}/>
        <Route  path="/options/attendances" element={<PersonalAttendance />}/>
        <Route  path="/options/court" element={<CourtAttendance />}/>
        <Route  path="/newcase" element={<NewCase updateData={updateData}/>}/>
      </Routes>
      </BrowserRouter>
      </MyContext.Provider>
  )
}

export default App



