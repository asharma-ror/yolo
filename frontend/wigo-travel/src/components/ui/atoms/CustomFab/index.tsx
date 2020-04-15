import React, { AriaAttributes } from "react"
import { Close } from "@material-ui/icons"
import { Fab } from "@material-ui/core"

export type FabColor = "inherit" | "primary" | "secondary" | "default"

interface Props extends AriaAttributes {
  color?: FabColor
  children: React.ReactNode
  onClick: () => void
}

export default function CustomFab({
  color,
  children,
  onClick,
  ...rest
}: Props) {
  return (
    <Fab color={color} onClick={onClick} {...rest}>
      {children}
    </Fab>
  )
}

CustomFab.defaultProps = {
  color: "primary",
}

interface CloseFabProps {
  color?: FabColor
  onClick: () => void
}

export const CloseFab = ({ onClick, color, ...rest }: CloseFabProps) => {
  return (
    <CustomFab onClick={onClick} color={color} {...rest}>
      <Close />
    </CustomFab>
  )
}
