import { Box, CardContent, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import CustomCard from "../../../../components/ui/molecules/CustomCard"
import ProductDestinationDetailsDialog from "./ProductDestinationDetailsDialog"

const useStyles = makeStyles({
  cardContainer: {
    margin: 10,
  },
  cardMain: {
    minHeight: 240,
  },
  cardBody: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "0 !important",
  },
  cardTitle: {
    backgroundColor: "rgba(255,255,255, .8)",
  },
})

interface Props {
  destination: any
}

const ProductDestination = ({ destination }: Props) => {
  const classes = useStyles()
  const [openDetails, setOpenDetails] = React.useState(false)

  return (
    <div className={classes.cardContainer}>
      <CustomCard
        className={classes.cardMain}
        background
        backgroundImage={destination.image?.localFile?.childImageSharp.fluid}
      >
        <CardContent
          className={classes.cardBody}
          onClick={() => setOpenDetails(true)}
        >
          <Box textAlign="center" className={classes.cardTitle}>
            <Typography variant="h4">{destination.name.text}</Typography>
          </Box>
        </CardContent>
      </CustomCard>
      <ProductDestinationDetailsDialog
        destination={destination}
        open={openDetails}
        onClose={() => setOpenDetails(false)}
      ></ProductDestinationDetailsDialog>
    </div>
  )
}

export default ProductDestination
