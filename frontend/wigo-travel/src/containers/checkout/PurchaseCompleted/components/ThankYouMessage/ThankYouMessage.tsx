import { Box, Button, makeStyles, Theme, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"

const useStyles = makeStyles((theme: Theme) => ({
  message: {
    margin: theme.spacing(2, 0),
  },
}))

const ThankYouMessage = () => {
  const classes = useStyles()
  return (
    <Box>
      <Typography variant="h3">Grazie!</Typography>
      <Typography variant="body1" className={classes.message}>
        A breve riceverai una mail di riepilogo contenente i dati della tua
        prenotazione
      </Typography>
      <Box my={2}>
        <Link to="/">
          <Button variant="contained" fullWidth color="primary">
            Torna alla homepage
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default ThankYouMessage
