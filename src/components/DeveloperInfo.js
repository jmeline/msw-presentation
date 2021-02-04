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
    width: 125
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  link: {
    textDecoration: "underline"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

const DeveloperInfo = ({ user }) => {
  const classes = useStyles()
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  useEffect(() => {
    getUserRepos(user.login)
      .then(data => {
        setRepos(data)
        setLoading(false)
      })
  }, [user.login])

  if (loading) {
    return <Typography variant="h4"> Loading Developer details</Typography>
  }

  const favoriteLanguages = repos?.reduce((acc, repo) => {
    if (!repo?.language) {
      return acc
    }
    return {...acc, [repo.language]: (acc[repo.language] ?? 0) + 1 }
  }, {})

  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia className={classes.media} image={user.avatar_url} />
      <div style={{ display: "flex", flexDirection: 'column'}}>
        <CardContent>
          <Typography variant="h6">
            Name: <Link className={classes.link} color="inherit" href={user.html_url}> {user.name}</Link>
          </Typography>
          <Typography variant="h6">
            Company: {user.company}
          </Typography>
          <Typography variant="h6">
            Location: {user.location ?? "Unknown"}
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}

export default DeveloperInfo
