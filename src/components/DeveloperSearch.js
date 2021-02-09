import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import Link from "@material-ui/core/Link"
import styled from "styled-components"
import { getUser } from "../api/api"

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
  background: ${({ selected }) => (selected ? "lightgray" : "white")};
  &:hover {
    background: lightgray;
  }
`

const StyledLabel = styled.div`
  margin-right: 10px;
`

const StyledDeveloperSearchDiv = styled.div`
  height: 36em;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 15;
  border: 2px gray solid;
`

export default function DeveloperSearch({ setDevelopers }) {
  const classes = useStyles()
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)
  const [possibleOptions, setPossibleOptions] = useState({ items: [] })
  const [loading, setLoading] = useState(false)

  const [selectedDevelopers, setSelectedDevelopers] = useState([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSelectingDeveloper = login => {
    setSelectedDevelopers(developers => {
      if (developers.find(developer => developer === login)) {
        return developers.filter(developer => developer !== login)
      }
      return [login, ...developers].sort((a, b) => a - b)
    })
  }

  const handleSearch = async () => {
    setLoading(true)
    const [response, error] = await searchForUser(text ?? "")
    if (error) {
      console.log(error)
      return
    }
    console.log(response)
    setLoading(false)
    setPossibleOptions(response)
  }

  const handleAdd = async () => {
    console.log(selectedDevelopers)
    Promise.all(
      selectedDevelopers.map(async developer => {
        const [resp, error] = await getUser(developer)
        if (error) {
          Promise.reject(error)
        }
        return resp
      })
    )
      .then(users => {
        console.log(users)
        setDevelopers(currentUsers => [...users, ...currentUsers])
        setOpen(false)
      })
      .catch(error => console.log("I took an error", error))
  }

  return (
    <div>
      <Button color="primary" onClick={handleOpen}>
        Search for new developers
      </Button>
      <Dialog
        disableEscapeKeyDown
        disableBackdropClick
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Developer</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <StyledLabel htmlFor="developer">Find Developer: </StyledLabel>
            <input
              style={{ marginRight: 10 }}
              id="developer"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={handleSearch}>
              Search
            </Button>
          </div>
        </DialogContent>
        <DialogContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography style={{marginRight: 10}}>Selected: {selectedDevelopers.length}</Typography>
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={() => setSelectedDevelopers([])}>
              Reset
            </Button>
          </div>
        </DialogContent>
        <DialogContent>
          <StyledDeveloperSearchDiv>
            {loading
              ? <Typography> Loading Developers </Typography>
              : possibleOptions?.items?.map(developer => (
                  <StyledDeveloperSearchCardDiv
                    key={developer.login}
                    onClick={() => handleSelectingDeveloper(developer.login)}
                    selected={selectedDevelopers.includes(developer.login)}>
                    <div style={{ flex: 1 }}>
                      <Avatar
                        className={classes.large}
                        src={developer.avatar_url}
                      />
                    </div>
                    <Link href={developer.html_url}>{developer.login}</Link>
                  </StyledDeveloperSearchCardDiv>
                ))}
          </StyledDeveloperSearchDiv>
        </DialogContent>
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
