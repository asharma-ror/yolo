import React, { AriaAttributes } from "react"
import { IconButton, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  button: {
    padding: "5px",
    color: "rgba(200, 200, 200, 0.85)",
  },
})

interface Props extends AriaAttributes {
  icon: React.ReactNode
  onClick: () => void
}

const CustomIconButton = ({ icon, onClick, ...rest }: Props) => {
  const classes = useStyles()
  return (
    <IconButton className={classes.button} onClick={onClick} {...rest}>
      {icon}
    </IconButton>
  )
}

export default CustomIconButton
