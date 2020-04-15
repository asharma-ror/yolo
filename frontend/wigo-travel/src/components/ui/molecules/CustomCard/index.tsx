import { Card, makeStyles } from "@material-ui/core"
import classNames from "classnames"
import React from "react"
import { ImageField } from "../Fields"

interface Props {
  children?: any
  className?: any
  background?: boolean
  backgroundImage?: any
}

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
  },
  backgroundContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
})

const BackgroundImageCard = ({ children, backgroundImage, className }: any) => (
  <ImageField className={className} value={backgroundImage} background>
    {children}
  </ImageField>
)

const CustomCard = ({
  children,
  className,
  background,
  backgroundImage,
  ...rest
}: Props) => {
  const classes = useStyles()
  return (
    <Card
      className={classNames(className, classes.card)}
      {...rest}
      elevation={3}
    >
      {background && backgroundImage ? (
        <BackgroundImageCard
          className={classes.backgroundContainer}
          backgroundImage={backgroundImage}
        >
          {children}
        </BackgroundImageCard>
      ) : (
        children
      )}
    </Card>
  )
}

export default CustomCard
