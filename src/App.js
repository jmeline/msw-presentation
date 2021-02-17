import React, { useState } from "react"
import DeveloperInfo from "./components/DeveloperInfo"
import DeveloperSearch from "./components/DeveloperSearch"
import Typography from "@material-ui/core/Typography"

function App() {
  const [developers, setDevelopers] = useState([])
  return (
    <div className="App-header">
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <Typography variant="h5">Developer showcase</Typography>
        <hr />
        <DeveloperSearch setDevelopers={setDevelopers} />
      </div>

      {developers.map(developer => (
        <div key={developer.login} style={{ padding: 10 }}>
          <DeveloperInfo
            onDelete={() =>
              setDevelopers(currentDevelopers => currentDevelopers.filter(x => x.login !== developer.login))
            }
            developer={developer}
          />
        </div>
      ))}
    </div>
  )
}

export default App
