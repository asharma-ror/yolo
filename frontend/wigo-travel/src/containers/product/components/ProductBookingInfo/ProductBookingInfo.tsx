import { Box, Button, Container, Grid, Typography } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import DateRangeIcon from "@material-ui/icons/DateRange"
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff"
import NightsStayIcon from "@material-ui/icons/NightsStay"
import PeopleIcon from "@material-ui/icons/People"
import React from "react"
import InfoBox from "../../../../components/ui/molecules/InfoBox"
import { getGreyBackgroundColor } from "../../../../utils/themeUtils"
import ProductCalendar from "../ProductCalendar/ProductCalendar"
import { RichTextField } from "../../../../components/ui/molecules/Fields"

interface Props {
  product: any
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  priceInfoContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem 0",
      justifyContent: "center",
    },
  },
  priceInfo: {
    display: "flex",
    alignItems: "flex-end",
  },
  priceLabel: {
    marginRight: 5,
    marginBottom: 12,
    fontSize: "1rem",
  },
  whenInfoContainer: {
    backgroundColor: getGreyBackgroundColor(theme),
  },
  whereInfoContainer: {
    backgroundColor: getGreyBackgroundColor(theme),
  },
  infoCtaContainer: {
    textAlign: "center",
  },
  cta: {
    width: "80%",
  },
}))

const ProductBookingInfo = ({ product }: Props) => {
  const classes = useStyles()
  const [calendarOpened, setCalendarOpened] = React.useState(false)

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={4} className={classes.priceInfoContainer}>
          <Box className={classes.priceInfo}>
            <span className={classes.priceLabel}>Da</span>
            <Typography variant="h2">
              <RichTextField value={product.data.price_info}></RichTextField>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.whenInfoContainer}>
          <InfoBox
            data={{
              icon: <DateRangeIcon />,
              title: "SETTIMANA",
              body: product.data.week_info,
            }}
          ></InfoBox>
          <InfoBox
            data={{
              icon: <PeopleIcon />,
              title: "NUMERO DI PERSONE",
              body: product.data.people_info,
            }}
          ></InfoBox>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.whereInfoContainer}>
          <InfoBox
            data={{
              icon: <NightsStayIcon />,
              title: "DURATA",
              body: product.data.duration_info,
            }}
          ></InfoBox>
          <InfoBox
            data={{
              icon: <FlightTakeoffIcon />,
              title: "PARTENZA",
              body: product.data.airport_info,
            }}
          ></InfoBox>
          <Box mx={1} mb={2} className={classes.infoCtaContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.cta}
              onClick={() => setCalendarOpened(true)}
            >
              Prenota
            </Button>
            <ProductCalendar
              open={calendarOpened}
              productId={product.data.product_id}
              onClose={() => setCalendarOpened(false)}
            ></ProductCalendar>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductBookingInfo
