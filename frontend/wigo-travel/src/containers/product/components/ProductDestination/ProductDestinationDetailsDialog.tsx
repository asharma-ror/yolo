import {
  Box,
  Button,
  Dialog,
  DialogActions,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import React from "react"
import ProductDestinationDetails from "./ProductDestinationDetails"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  content: {
    flex: 1,
  },
  actions: {},
})

interface Props {
  destination: any
  open: boolean
  onClose: () => void
}

const ProductDestinationDetailsDialog = ({
  destination,
  open,
  onClose,
}: Props) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const classes = useStyles()

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <Box className={classes.container}>
        <Box className={classes.content}>
          <ProductDestinationDetails destination={destination} />
        </Box>
        <DialogActions className={classes.actions}>
          <Button color="primary" onClick={onClose}>
            Chiudi
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default ProductDestinationDetailsDialog
