import { Container, makeStyles, Theme } from "@material-ui/core"
import classNames from "classnames"
import React from "react"

type BackgroundColor = "primary" | "secondary"

interface Props {
  children?: any
  className?: any
  backgroundColor?: BackgroundColor
  disableGutters?: boolean
  disableGuttersDown?: "xs" | "sm" | "md" | "lg"
  disableGuttersUp?: "sm" | "md" | "lg" | "xl"
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
  pt?: number
  pb?: number
  py?: number
  mt?: number
  mb?: number
  my?: number
}

const useStyles = makeStyles((theme: Theme) => ({
  backgroundColorPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  secondaryColorPrimary: {
    backgroundColor: theme.palette.secondary.main,
  },
  disableGuttersUpSm: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  disableGuttersUpMd: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  disableGuttersUpLg: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  disableGuttersUpXl: {
    [theme.breakpoints.up("xl")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  disableGuttersDownXs: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  disableGuttersDownSm: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  disableGuttersDownMd: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  disableGuttersDownLg: {
    [theme.breakpoints.down("lg")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  root: {
    paddingTop: (props: any) => theme.spacing(props.paddingTop),
    paddingBottom: (props: any) => theme.spacing(props.paddingBottom),
  },
}))

const CustomContainer = ({
  children,
  className,
  backgroundColor,
  disableGutters,
  maxWidth,
  disableGuttersDown,
  disableGuttersUp,
  pt,
  pb,
  py,
  mt,
  mb,
  my,
}: Props) => {
  const classes = useStyles({
    paddingTop: py ?? pt ?? 0,
    paddingBottom: py ?? pb ?? 0,
    marginTop: my ?? mt ?? 0,
    marginBottom: my ?? mb ?? 0,
  })
  const containerClasses = classNames({
    [classes.root]: true,
    [classes.backgroundColorPrimary]: backgroundColor === "primary",
    [classes.secondaryColorPrimary]: backgroundColor === "secondary",
    [classes.disableGuttersUpSm]: disableGuttersUp === "sm",
    [classes.disableGuttersUpMd]: disableGuttersUp === "md",
    [classes.disableGuttersUpLg]: disableGuttersUp === "lg",
    [classes.disableGuttersUpXl]: disableGuttersUp === "xl",
    [classes.disableGuttersDownXs]: disableGuttersDown === "xs",
    [classes.disableGuttersDownSm]: disableGuttersDown === "sm",
    [classes.disableGuttersDownMd]: disableGuttersDown === "md",
    [classes.disableGuttersDownLg]: disableGuttersDown === "lg",
    className,
  })
  return (
    <Container
      className={containerClasses}
      maxWidth={maxWidth}
      disableGutters={disableGutters}
    >
      {children}
    </Container>
  )
}

export default CustomContainer
