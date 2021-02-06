import { useState } from "react"
import Fade from "@material-ui/core/Fade"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import TextField from "@material-ui/core/TextField"
import Avatar from "@material-ui/core/Avatar"
import Link from "@material-ui/core/Link"
import styled from "styled-components"

import { searchForUser } from "../api/api"

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}))

const StyledDeveloperSearchCardDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px;
  border: 2px gray dashed;
  margin-bottom: 10px;
  cursor: pointer;
`

const StyledLabel = styled.div`
  margin-right: 10px;
`

export default function DeveloperSearch({ setDevelopers }) {
  const classes = useStyles()
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)
  const [possibleOptions, setPossibleOptions] = useState({ items: [] })
  const [loading, setLoading] = useState(false)

  const [selectedDeveloper, setSelectedDeveloper] = useState(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSelectingDeveloper = login => {
    console.log(login)
    setSelectedDeveloper(login)
  } 

  const handleSearch = async () => {
    setLoading(true)
    const response = await searchForUser(text ?? "")
    console.log(response)
    setLoading(false)
    setPossibleOptions(response)
  }

  const handleAdd = async () => {
    setDevelopers()
    // const user = "jmeline"
    // getUser(user)
    //   .then(data => {
    //     setUser(data)
    //     setLoading(false)
    //     });
  }

  const body = (
    <>
      <DialogContentText>Add new developer to the team!</DialogContentText>
      <div style={{ display: "flex", alignItems: "baseline", justifyItems: "center" }}>
        <StyledLabel htmlFor="developer">Find Developer: </StyledLabel>
        <input id="developer" value={text} onChange={e => setText(e.target.value)} />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div style={{
        height: "36em",
        overflowX: "hidden",
        overflowY: "auto",
        padding: 15,
        border: "2px gray solid"
      }}>
      {
        loading
        ? "Loading possible developer"
        : possibleOptions?.items?.map(developer => (
            <StyledDeveloperSearchCardDiv key={developer.login}
             onClick={() => handleSelectingDeveloper(developer.login)}>
              <div style={{ flex: 1 }}>
                <Avatar className={classes.large} src={developer.avatar_url} />
              </div>
              <Link href={developer.html_url}>{developer.login}</Link>
            </StyledDeveloperSearchCardDiv>
          ))
      }
      </div>
    </>
  )

  return (
    <div>
      <Button color="primary" onClick={handleOpen}>
        Search for new developers
      </Button>
      <Dialog fullWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Developer</DialogTitle>
        <DialogContent>{body}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
