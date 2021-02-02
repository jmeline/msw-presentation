import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function validateUser() {
  throw new Error("User must be passed in!")
}
const githubUserApi = "https://api.github.com/users"

async function fetchFromGithub(url) {
  return await fetch(url, {
    headers: {
      'Content-Type': 'application/vnd.github.v3+json'
    }
  })
}

async function getUser(username = validateUser()) {
  const response = await fetchFromGithub(`${githubUserApi}/${username}`)
  if (!response.ok) {
    console.log(response.error);
    return;
  }
  return await response.json()
}

async function getUserRepos(username = validateUser()) {
  const response = await fetchFromGithub(`${githubUserApi}/${username}/repos`)
  if (!response.ok) {
    console.log(response.error);
    return;
  }
  return await response.json()
}

function App() {
  const [user, setUser] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("")

  useEffect(() => {
    setLoading(true)
    const user = "jmeline"
    getUser(user)
      .then(data => {
        setUser(data)
      });
    getUserRepos(user)
      .then(data => {
        setRepos(data)
      })
    setLoading(false)
  }, [])

  if (loading) {
    return <div> Loading data </div>
  }

  console.log(user)
  console.log(repos)


  return (
    <div>
      <header className="App-header">
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          <div>
            Developer showcase
          </div>
          <hr />
          <div>
          <label htmlFor="developer">Find Developer: </label>
          <input
            id="developer"
            value={text}
            onChange={e => setText(e.target.value)}/>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <img
            className="App-avatar"
            src={user.avatar_url}
            height={100}
            width={100}
            alt="Avatar" />
          <div style={{ padding: 10, flex: 1, alignItems: "center", justifyContent: "center"}}>
            <div>
              Name: <a className="App-link" href={user.html_url}> {user.name} </a>
            </div>
            <div style={{flex: 1}}>Company: {user.company}</div>
            <div style={{flex: 1}}>Location: {user.location}</div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
