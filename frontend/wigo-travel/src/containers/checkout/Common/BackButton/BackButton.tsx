import { Button } from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import React from "react"

function back() {
  window.history.back()
}

interface Props {
  children?: React.ReactNode
}

const BackButton = ({ children }: Props) => {
  return (
    <Button onClick={() => back()}>
      <ArrowBackIcon color="action" /> {children}
    </Button>
  )
}

export default BackButton
