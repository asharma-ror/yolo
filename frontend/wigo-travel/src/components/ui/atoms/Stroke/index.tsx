import { makeStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import React from "react"
import { strokeStyles } from "./styles"

interface Props {
  color: string
  noMargin: boolean
  thickness: number
}

const useStyles = makeStyles(strokeStyles)

const Stroke = ({ color, noMargin, thickness }: Props) => {
  const classes = useStyles({
    thickness: thickness,
  })
  const strokeClasses = classNames({
    [classes.stroke]: true,
    // @ts-ignore
    [classes[color]]: color,
    [classes.noMargin]: noMargin,
  })
  return <div className={strokeClasses} />
}

Stroke.defaultProps = {
  color: "",
  thickness: 3,
  noMargin: true,
}

export default Stroke
