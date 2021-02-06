import React, { useEffect, useState } from 'react';
// import './App.css';
import { getUser, getUserRepos } from "./api/api"
import DeveloperInfo from "./components/DeveloperInfo"
import DeveloperSearch from "./components/DeveloperSearch"
import Typography from "@material-ui/core/Typography"
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';

function App() {
  const [users, setUsers] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("")

  useEffect(() => {
    // const user = "jmeline"
    // getUser(user)
    //   .then(data => {
    //     setUser(data)
    //     setLoading(false)
    //     });
  }, [])

  console.log(users)
  console.log(repos)

  return (
    <div className="App-header">
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <Typography variant="h5">
          Developer showcase
        </Typography>
        <hr />
        <DeveloperSearch setDevelopers={setDevelopers}/>
      </div>

    {
        !loading 
        ? developers.map(developer => 
        <div key={developer.login} style={{ padding: 10 }}>
            <DeveloperInfo developer={developer} />
        </div> 
        )
        : null
    }
    </div>
  );
}

export default App;
