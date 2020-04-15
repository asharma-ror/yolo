import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { ImageField } from "../../molecules/Fields"

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    position: "relative",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      height: ({ height }: any) => height,
      minHeight: ({ minHeight }: any) => minHeight,
      maxHeight: ({ maxHeight }: any) => maxHeight,
    },
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2,
  },
  arrowDown: {
    position: "absolute",
    bottom: theme.spacing(4),
  },
}))

interface Props {
  children: any
  backgroundImage?: any
  backdrop?: boolean
  arrowDown?: boolean
  height?: string
  minHeight?: string
  maxHeight?: string
}

const HeroLayout = ({
  children,
  backgroundImage,
  backdrop,
  arrowDown,
  height,
  minHeight,
  maxHeight,
}: Props) => {
  const classes = useStyles({
    height: height,
    minHeight: minHeight,
    maxHeight: maxHeight,
  })
  return (
    <>
      <ImageField
        background
        tag="section"
        className={classes.root}
        value={backgroundImage}
      >
        <Container>
          {children}
          {backdrop ? <div className={classes.backdrop} /> : undefined}
          {arrowDown ? (
            <img
              className={classes.arrowDown}
              src="/static/themes/onepirate/productHeroArrowDown.png"
              height="16"
              width="12"
              alt="arrow down"
            />
          ) : undefined}
        </Container>
      </ImageField>
    </>
  )
}

HeroLayout.defaultProps = {
  height: "80vh",
  minHeight: "500px",
  maxHeight: "1300px",
}

export default HeroLayout
