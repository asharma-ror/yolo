import React from "react"
import { useTheme } from "@material-ui/core"

const SmContainerDecorator = (storyFn: any) => {
  const theme = useTheme()
  return (
    <div style={{ maxWidth: theme.breakpoints.width("sm") }}>{storyFn()}</div>
  )
}

export default SmContainerDecorator
