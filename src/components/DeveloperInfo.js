import { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { getUserRepos } from "../api/api"
import clsx from 'clsx';
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  media: {
    width: 130
  },
  link: {
    textDecoration: "underline"
  }
}))

const DeveloperInfo = ({ developer }) => {
  const classes = useStyles()
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  useEffect(() => {
    getUserRepos(developer.login)
      .then(data => {
        setRepos(data)
        setLoading(false)
      })
  }, [developer.login])

  if (loading) {
    return <Typography variant="h4"> Loading Developer details</Typography>
  }

  const counts = repos?.reduce((acc, repo) => {
    if (!repo?.language) {
      return acc
    }
    return {...acc, [repo.language]: (acc[repo.language] ?? 0) + 1 }
  }, {})

  const favoriteLanguages = Object.entries(counts)
    .map(x => x)
    .sort((a,b) => b[1] - a[1])
    .slice(0, 6)
    .map(lang => `${lang[0]}(${lang[1]})`)
    .join(", ")

  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia className={classes.media} image={developer.avatar_url} />
        <CardContent>
          <Typography variant="h6">
            Name: <Link className={classes.link} color="inherit" href={developer.html_url}> {developer.name}</Link>
          </Typography>
          <Typography variant="h6">
            Company: {developer.company}
          </Typography>
          <Typography variant="h6">
            Location: {developer.location ?? "Unknown"}
          </Typography>
          <Typography variant="h6">
            Favorite languages: {favoriteLanguages}
          </Typography>
        </CardContent>
        <CardActions>
          Delete goes here
        </CardActions>
    </Card>
  )
}

export default DeveloperInfo
