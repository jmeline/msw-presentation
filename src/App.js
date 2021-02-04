import React, { useEffect, useState } from 'react';
// import './App.css';
import { getUser, getUserRepos } from "./api/api"
import DeveloperInfo from "./components/DeveloperInfo"
import Typography from "@material-ui/core/Typography"

function App() {
  const [user, setUser] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("")

  useEffect(() => {
    const user = "jmeline"
    getUser(user)
      .then(data => {
        setUser(data)
        setLoading(false)
        });
  }, [])

  if (loading) {
    return <div> Loading data </div>
  }

  console.log(user)
  console.log(repos)

  return (
    <div className="App-header">
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <Typography variant="h5">
          Developer showcase
        </Typography>
        <hr />
        <div>
        <label htmlFor="developer">Find Developer: </label>
        <input
          id="developer"
          value={text}
          onChange={e => setText(e.target.value)}/>
        </div>
      </div>
      <div style={{ padding: 10 }}>
        <DeveloperInfo user={user} />
      </div>
    </div>
  );
}

export default App;
