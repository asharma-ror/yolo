import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  MenuItem,
  Grid,
  Select,
  Typography,
} from "@material-ui/core"
import React from "react"
import { getGreyBackgroundColor } from "../../../../utils/themeUtils"
import { makeStyles, Theme } from "@material-ui/core/styles"
import DateRangeIcon from "@material-ui/icons/DateRange"
import NightsStayIcon from "@material-ui/icons/NightsStay"
import PeopleIcon from "@material-ui/icons/People"
import {
  useGetProductAvailabilityQuery,
  ProductAvailabilityNode,
  GetProductAvailabilityQuery,
} from "../../../../api/backend-api"
import InfoBox from "../../../../components/ui/molecules/InfoBox"
import { createQuotation } from "../../../../features/checkout/checkoutSlice"
import { useDispatch } from "react-redux"
import { navigateToCheckoutServices } from "../../../../utils/navigationUtils"
import ErrorSnackbar from "../../../../components/ui/molecules/ErrorSnackbar"
import Loader from "../../../../components/ui/molecules/Loader"
import {
  getDepartureOptions,
  filterAvailabilityItems,
  getDurations,
} from "../../filters/availabilityFilters"
import {
  CalendarDepartureOption,
  CalendarDuration,
} from "../../types/calendarTypes"
import { range } from "../../../../utils/arrayUtils"

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
    display: "flex",
    backgroundColor: getGreyBackgroundColor(theme),
  },
  mainDialog: {
    overflowY: "unset",
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

interface Props {
  productId: string
  totAdults: number
  totRooms: number
  onAirpotSelected: (quotationId: string) => void
  onClose: () => void
}

const ProductCalendarWeeks = ({
  productId,
  totAdults,
  totRooms,
  onClose,
}: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [departureOptions, setDepartureOptions] = React.useState<
    CalendarDepartureOption[]
  >()
  const [departureOption, setDepartureOption] = React.useState<
    CalendarDepartureOption
  >()
  const [durations, setDurations] = React.useState<CalendarDuration[]>()
  const [duration, setDuration] = React.useState<CalendarDuration>()

  const [availabilityItems, setAvailabilityItems] = React.useState<
    ProductAvailabilityNode[]
  >()
  const [filteredAvailability, setFilteredAvailability] = React.useState<
    ProductAvailabilityNode[]
  >()

  const initializeAvailability = (data: GetProductAvailabilityQuery) => {
    const availabilityItems = data?.allProductAvailabilities?.edges.map(
      (x) => x?.node
    ) as ProductAvailabilityNode[]
    if (!availabilityItems || availabilityItems.length === 0) {
      setAvailabilityItems([])
      setDepartureOptions([])
      setDurations([])
      return
    }

    setAvailabilityItems(availabilityItems)
    const departureOptions = getDepartureOptions(availabilityItems)
    setDepartureOptions(departureOptions)
    setDepartureOption(departureOptions[0])
    const durationRanges = getDurations(availabilityItems)
    setDurations(durationRanges)
    setDuration(durationRanges[0])
    setFilteredAvailability(
      filterAvailabilityItems(
        availabilityItems,
        departureOptions[0],
        durationRanges[0]
      )
    )
  }

  const { loading, error } = useGetProductAvailabilityQuery({
    variables: {
      productId: productId,
      totAdults: totAdults,
      quantityAvailable_Gte: totRooms, // eslint-disable-line
    },
    onCompleted: (data) => initializeAvailability(data),
  })

  const handleDepartureOptionChanged = (optionId: string) => {
    const option = departureOptions?.find((x) => x.id === optionId)
    if (!option || !availabilityItems) {
      return
    }

    setDepartureOption(option)
    setFilteredAvailability(
      filterAvailabilityItems(availabilityItems, option, duration)
    )
  }

  const handleDurationRangeChanged = (durationId: string) => {
    const durationRange = durations?.find((x) => x.id === durationId)
    if (!durationRange || !availabilityItems) {
      return
    }

    setDuration(durationRange)
    setFilteredAvailability(
      filterAvailabilityItems(availabilityItems, departureOption, durationRange)
    )
  }

  const handleAvailabilityItemSelected = (
    availabilityItem: ProductAvailabilityNode
  ) => {
    const availabilityKeys = range(0, totRooms - 1).map(
      () => availabilityItem.availabilityKey
    )
    dispatch(
      createQuotation(availabilityKeys, (quotation) => {
        navigateToCheckoutServices(quotation.quotationId)
      })
    )
  }

  const hasAvailability = (): boolean =>
    (availabilityItems && availabilityItems.length > 0) ?? false

  return (
    <>
      <DialogContent className={classes.mainDialog}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <>
              {error ? (
                <>Siamo spiacenti, si è verificato un errore</>
              ) : undefined}
            </>
            <>
              {hasAvailability() ? (
                <>
                  {departureOptions && departureOptions.length > 1 ? (
                    <>
                      <Typography variant="h6">
                        Da dove vuoi partire?
                      </Typography>
                      <Box textAlign="center">
                        <FormControl size="small">
                          <Select
                            variant="outlined"
                            value={departureOption?.id}
                            onChange={(
                              event: React.ChangeEvent<HTMLSelectElement>
                            ) =>
                              handleDepartureOptionChanged(event.target.value)
                            }
                          >
                            {departureOptions?.map((value) => (
                              <MenuItem key={value.id} value={value.id}>
                                {value.displayName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </>
                  ) : undefined}
                  {durations && durations.length > 1 ? (
                    <>
                      <Typography variant="h6">
                        Per quante settimane?
                      </Typography>
                      <Box textAlign="center">
                        <FormControl size="small">
                          <Select
                            variant="outlined"
                            value={duration?.id}
                            onChange={(
                              event: React.ChangeEvent<HTMLSelectElement>
                            ) => handleDurationRangeChanged(event.target.value)}
                          >
                            {durations?.map((value) => (
                              <MenuItem key={value.id} value={value.id}>
                                {value.displayName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </>
                  ) : undefined}

                  <Box mt={3}>
                    <Typography variant="h6">Quando vuoi partire?</Typography>
                  </Box>
                  <Box mt={3}>
                    {filteredAvailability?.map((x) => (
                      <Grid
                        container
                        alignItems="center"
                        key={x.availabilityKey}
                        className={classes.whenInfoContainer}
                      >
                        <Grid item sm={4} xs={12}>
                          <InfoBox
                            data={{
                              icon: <DateRangeIcon />,
                              title: "DATA PARTENZA",
                              body: x.startDateFrom + " TO " + x.startDateTo,
                            }}
                          />
                        </Grid>
                        <Grid item sm={2} xs={12}>
                          <InfoBox
                            data={{
                              icon: <NightsStayIcon />,
                              title: "NOTTI",
                              body: x.nights,
                            }}
                          />
                        </Grid>
                        <Grid item sm={3} xs={12}>
                          <InfoBox
                            data={{
                              icon: <PeopleIcon />,
                              title: "",
                              body: x.price + "€",
                            }}
                          />
                        </Grid>
                        <Grid item sm={3} xs={12}>
                          <Box display="flex" alignItems="center">
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => handleAvailabilityItemSelected(x)}
                            >
                              SELEZIONA
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    ))}
                  </Box>
                </>
              ) : (
                <>Nessuna disponibilità</>
              )}
            </>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Annulla
        </Button>
      </DialogActions>
      <ErrorSnackbar condition={error} message="Si è verificato un errore" />
    </>
  )
}

export default ProductCalendarWeeks
