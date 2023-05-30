import { Link } from 'react-router-dom';


function Home() {
  
  return (
    <>
      <div className = 'homePage'>
    <p>Home Page</p>
    <p>Did something just happen! Click below to get it down and done! </p>

<br></br>
    
    <Link to="/case">
    <button className = 'reCord'>Add time/Check existing files</button>
        </Link>

<br></br>
        <Link to="/newcase">
    <button className = 'newFile'>Create new file</button>
        </Link>
      </div>
  
    </>
  )
}

export default Home