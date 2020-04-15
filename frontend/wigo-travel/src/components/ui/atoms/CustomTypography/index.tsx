import React from "react"
import { Typography, makeStyles } from "@material-ui/core"
import classNames from "classnames"
import {
  FontColor,
  TextVariant,
  FontWeight,
} from "../../../../types/theme-types"

interface Props {
  component?: string
  children?: React.ReactNode
  innerHtml?: string
  color?: FontColor
  variant?: TextVariant
  weight?: FontWeight
  className?: string
}

const useStyles = makeStyles((theme) => ({
  inherit: {
    color: "inherit",
  },
  white: {
    color: theme.palette.common.white,
  },
  primary: {
    color: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  uppercase: {
    textTransform: "uppercase",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  fontWeightNormal: {
    fontWeight: "normal",
  },
  fontWeightBold: {
    fontWeight: 900,
  },
}))

const CustomTypography = ({
  component,
  children,
  innerHtml,
  color,
  weight,
  variant,
  className,
  ...other
}: Props) => {
  const classes = useStyles()
  const elementClasses = classNames(className, {
    [classes.inherit]: color === "inherit",
    [classes.white]: color === "white",
    [classes.primary]: color === "primary",
    [classes.secondary]: color === "secondary",
    [classes.fontWeightNormal]: weight === "normal",
    [classes.fontWeightBold]: weight === "bold",
  })
  return (
    <>
      {innerHtml ? (
        <Typography
          component={component as any}
          variant={variant}
          className={elementClasses}
          dangerouslySetInnerHTML={{
            __html: innerHtml,
          }}
          {...other}
        ></Typography>
      ) : (
        <Typography variant={variant} className={elementClasses} {...other}>
          {children}
        </Typography>
      )}
    </>
  )
}

export default CustomTypography
