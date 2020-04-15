import { Box, Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import Img from "gatsby-image"
import React from "react"
import { RichTextField } from "../../../../components/ui/molecules/Fields"
import SlickCarousel from "../../../../components/ui/molecules/SlickCarousel"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  imgContainer: {
    padding: theme.spacing(1),
  },
}))

interface Props {
  hotel: any
}

const ProductDestinationHotel = ({ hotel }: Props) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="body1">
          <RichTextField value={hotel.description} />
        </Typography>
      </Box>

      <SlickCarousel>
        {hotel.gallery.map((galleryItem: any, index: number) => (
          <div key={index} className={classes.imgContainer}>
            <Img
              fluid={galleryItem.image?.localFile?.childImageSharp.fluid}
            ></Img>
          </div>
        ))}
      </SlickCarousel>
    </Box>
  )
}

export default ProductDestinationHotel
