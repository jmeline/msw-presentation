import { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { getUserRepos } from "../api/api"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Link from "@material-ui/core/Link"
import DeleteIcon from "@material-ui/icons/Delete"
import { getProgrammingLanguageFrequencyByRepo } from "./utilities/repoUtilities"

const useStyles = makeStyles({
  root: {
    display: "flex",
    border: "1px solid black"
  },
  media: {
    width: 130
  },
  link: {
    textDecoration: "underline"
  }
})

const DeveloperInfo = ({ developer, onDelete }) => {
  const classes = useStyles()
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserRepos(developer.login).then(([data, error]) => {
      setRepos(data)
      setLoading(false)
    })
  }, [developer.login])

  if (loading) {
    return <Typography variant="h4"> Loading Developer details</Typography>
  }

  const favoriteLanguages = getProgrammingLanguageFrequencyByRepo(repos)

  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia className={classes.media} image={developer.avatar_url} />
      <CardContent style={{ flex: 1 }}>
        <Typography variant="h6">
          Name: &nbsp;
          <Link
            className={classes.link}
            color="inherit"
            href={developer.html_url}>
            {developer.name ?? developer.login}
          </Link>
        </Typography>
        <Typography variant="h6">
          Company: {developer.company ?? "Unknown"}
        </Typography>
        <Typography variant="h6">
          Location: {developer.location ?? "Unknown"}
        </Typography>
        <Typography variant="h6">
          Favorite languages: {favoriteLanguages}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default DeveloperInfo
