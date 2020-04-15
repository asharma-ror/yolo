import React from "react"
import { Grid, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: (props: any) => theme.spacing(props.marginTop),
    marginBottom: (props: any) => theme.spacing(props.marginBottom),
  },
  item: {
    "&:nth-child(odd)": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

interface Props {
  items: React.ReactNode[]
  mt?: number
  mb?: number
}

const ItemsList = ({ items, mt, mb }: Props) => {
  const classes = useStyles({
    marginTop: mt ?? 0,
    marginBottom: mb ?? 0,
  })
  return (
    <Grid container className={classes.root}>
      {items.map((item, index) => (
        <Grid item key={index} xs={12} sm={3} className={classes.item}>
          {item}
        </Grid>
      ))}
    </Grid>
  )
}

export default ItemsList
