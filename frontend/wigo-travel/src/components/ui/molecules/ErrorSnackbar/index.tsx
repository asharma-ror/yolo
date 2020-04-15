import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"

interface Props {
  condition?: any
  message: React.ReactNode
  duration?: number
  fixed?: boolean
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const InnerSnackbar = ({ message, duration }: any) => {
  const [open, setOpen] = React.useState(true)
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  )
}

export default function ErrorSnackbar({
  condition,
  message,
  duration,
  fixed,
}: Props) {
  return (
    <>
      {condition ? (
        <InnerSnackbar
          message={message}
          duration={fixed ? undefined : duration}
        />
      ) : undefined}
    </>
  )
}

ErrorSnackbar.defaultProps = {
  duration: 3000,
  fixed: false,
}
