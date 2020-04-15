import { makeStyles } from "@material-ui/styles"
import React from "react"
import classNames from "classnames"
import { RichTextField, ImageField, ImageSize } from "../Fields"
import { Grid, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
  icon: {
    maxWidth: "100%",
  },
  title: {
    padding: (props: any) => props.titlePadding,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
  body: {
    padding: (props: any) => props.bodyPadding,
    marginTop: theme.spacing(1),
  },
}))

export type IconSize = "fixed" | "fluid"

export interface InfoBoxData {
  icon: React.ReactNode | any
  iconSize?: ImageSize
  title?: any
  body?: any
}

interface Props {
  data: InfoBoxData
  titlePadding?: string
  bodyPadding?: string
  className?: string
}

const InfoBox = ({ data, titlePadding, bodyPadding, className }: Props) => {
  const classes = useStyles({
    titlePadding,
    bodyPadding,
  })
  return (
    <Grid container className={classNames(className, classes.root)}>
      <Grid item xs={12} sm={3}>
        {React.isValidElement(data.icon) ? (
          <>{data.icon}</>
        ) : (
          <ImageField
            value={data.icon}
            size={data.iconSize}
            className={classes.icon}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={9}>
        {data.title ? (
          <RichTextField
            className={classes.title}
            value={data.title}
            variant="h5"
          />
        ) : undefined}
        {data.body ? (
          <RichTextField
            className={classes.body}
            value={data.body}
            variant="body1"
          />
        ) : undefined}
      </Grid>
    </Grid>
  )
}

export default InfoBox
