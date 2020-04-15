import {
  Box,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Theme,
  Typography,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import ProductDestinationHotel from "./ProductDestinationHotel"
import {
  RichTextField,
  ImageField,
} from "../../../../components/ui/molecules/Fields"

const useStyles = makeStyles((theme: Theme) => ({
  coverImage: {
    minHeight: "180px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  coverTitle: {
    color: theme.palette.common.white,
  },
  hotelPanelContainer: {
    width: "100%",
  },
  hotelPanelHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

interface Props {
  destination: any
}

const ProductDestinationDetails = ({ destination }: Props) => {
  const classes = useStyles()
  const getPanelId = (index: number) => `panel_${index}`
  const [expanded, setExpanded] = React.useState<string | false>(getPanelId(0))
  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <>
      <ImageField
        background
        value={destination.image?.localFile?.childImageSharp}
        className={classes.coverImage}
      >
        <Typography variant="h4" className={classes.coverTitle}>
          {destination.name.text}
        </Typography>
      </ImageField>
      <Box m={1}>
        <Typography variant="body1">
          <RichTextField value={destination.description} />
        </Typography>
      </Box>
      <Box className={classes.hotelPanelContainer}>
        {destination.hotels.map((item: any, index: number) => (
          <ExpansionPanel
            key={index}
            expanded={expanded === getPanelId(index)}
            onChange={handleChange(getPanelId(index))}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.hotelPanelHeading}>
                {item.hotel.document[0].data.name.text}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ProductDestinationHotel hotel={item.hotel.document[0].data} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Box>
    </>
  )
}

export default ProductDestinationDetails
