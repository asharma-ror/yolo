import {
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core"
import React from "react"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  price: {
    margin: theme.spacing(0, 2),
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}))

interface Props {
  icon: React.ReactNode
  name: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
}

const Service = ({ icon, name, description, children }: Props) => {
  const classes = useStyles()

  return (
    <>
      <Grid container alignItems="center" className={classes.root}>
        <Grid item xs={12} sm={8}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <>{icon}</>
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={<>{description}</>}
            ></ListItemText>
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={4}>
          {children}
        </Grid>
      </Grid>
    </>
  )
}

export default Service
