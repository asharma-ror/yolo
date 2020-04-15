import React from "react"
import {
  SearchWidgetContext,
  SearchWidgetLabels,
  PassengersLabels,
  CalendarLabels,
} from "../../../../context/contents/searchWidgetContext"
import DotStepper from "../../../ui/molecules/DotStepper"
import { makeStyles } from "@material-ui/styles"
import SearchPeopleFilter from "../../../ui/organisms/Search/SearchPeopleFilter"
import { useTheme, Theme } from "@material-ui/core"
import PaneActions from "../../../ui/molecules/PaneActions"
import SearchWidgetPersister from "../SearchWidgetPersister"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../state/rootReducer"
import {
  setPassengers,
  setDate,
  setDuration,
} from "../../../../features/search/searchSlice"
import SearchCalendarFilter from "../../../ui/organisms/Search/SearchCalendarFilter"
import { useGetCalendarAvailabilitiesQuery } from "../../../../api/backend-api"
import ErrorSnackbar from "../../../ui/molecules/ErrorSnackbar"
import Loader from "../../../ui/molecules/Loader"
import { toCalendarAvailabilities } from "../../../../converters/backend/availabilityConverter"
import { CalendarAvailability } from "../../../../types/availability"
import { DurationRange } from "../../../../features/search/searchTypes"
import { createDurations } from "../../../../converters/search/durations"
import { minDate, maxDate } from "../../../../utils/dateUtils"
import { first, isEmpty, isNotEmpty } from "../../../../utils/arrayUtils"
import { filterAvailability } from "../../../../converters/search/availability"

interface Props {
  defaultPassengers: number
  maxPassengers: number
  durationRange: number
  onCancel?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  stepper: {
    width: "50%",
  },
  content: {
    flex: 1,
  },
  actions: {},
  cancelButton: {
    // borderBottomStyle: "solid",
    // borderBottomColor: theme.palette.common.white,
    // borderBottomWidth: 1,
  },
}))

interface PeopleStepProps {
  passengerLabels: PassengersLabels
  adultsValue: number
  maxPassengers: number
  onChange?: (selectedPassengers: number) => void
}

const PeopleStep = ({
  adultsValue,
  maxPassengers,
  onChange,
  passengerLabels,
}: PeopleStepProps) => {
  return (
    <SearchPeopleFilter
      label={passengerLabels.title}
      selectedPassengers={adultsValue}
      maxPassengers={maxPassengers}
      peopleSingularLabel={passengerLabels.peopleSingularLabel}
      peoplePluralLabel={passengerLabels.peoplePluralLabel}
      onChange={onChange}
    />
  )
}

interface CalendarStepProps {
  loading: boolean
  calendarLabels: CalendarLabels
  availability: CalendarAvailability[]
  selectedDate?: Date
  durationOptions: DurationRange[]
  selectedDuration?: DurationRange
  onDateChange: (value: Date | undefined) => void
  onDurationChange: (value: DurationRange | undefined) => void
}

const durationLabel = (value: number, calendarLabels: CalendarLabels) =>
  `${value} ${
    value === 1
      ? calendarLabels.nightSingularLabel
      : calendarLabels.nightPluralLabel
  }`.toUpperCase()

const findDuration = (options: DurationRange[], nights: number) =>
  options.find((x) => x.minNights <= nights && nights <= x.maxNights)

const CalendarStep = ({
  calendarLabels,
  availability,
  selectedDate,
  durationOptions,
  selectedDuration,
  onDateChange,
  onDurationChange,
}: CalendarStepProps) => {
  const filteredAvailability = filterAvailability(
    availability,
    selectedDuration
  )

  const minDepartureDate = minDate(
    filteredAvailability.map((x) => x.startDateFrom)
  )
  const maxDepartureDate = maxDate(
    filteredAvailability.map((x) => x.startDateFrom)
  )

  const [monthDate, setMonthDate] = React.useState<Date | undefined>(
    selectedDate ?? minDepartureDate
  )

  if (monthDate && monthDate > maxDepartureDate) {
    setMonthDate(maxDepartureDate)
  }

  const handleDurationChange = (value: DurationRange) => {
    onDurationChange(value)
  }

  if (isEmpty(filteredAvailability) || !minDepartureDate || !maxDepartureDate) {
    return <div>Nessun prodotto disponibile</div>
  }

  return (
    <SearchCalendarFilter
      minDate={minDepartureDate}
      maxDate={maxDepartureDate}
      date={monthDate}
      label={calendarLabels.title}
      duration={selectedDuration}
      durations={durationOptions}
      durationLabel={(x) => durationLabel(x.maxNights, calendarLabels)}
      onDateChange={(x) => setMonthDate(x)}
      onDurationChange={handleDurationChange}
    />
  )
}

interface DestinationStepProps {}

const DestinationStep = ({}: DestinationStepProps) => {
  return <></>
}

const isValidCombination = (
  availability: CalendarAvailability[],
  duration: DurationRange | undefined,
  date: Date | undefined
) => isNotEmpty(filterAvailability(availability, duration, date))

const SearchWidget = ({
  maxPassengers,
  defaultPassengers,
  durationRange,
  onCancel,
}: Props) => {
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useDispatch()
  const { totAdults, selectedDate, selectedDuration } = useSelector(
    (state: RootState) => state.search
  )

  const [step, setStep] = React.useState(0)

  const adultsValue = totAdults ?? defaultPassengers
  const handleConfirm = () => {
    if (step < 2) {
      setStep(step + 1)
      return
    }

    // todo
    console.log("next step")
  }

  const cancelButton = (labels: SearchWidgetLabels) => ({
    label: (
      <span className={classes.cancelButton}>{labels.common.cancelButton}</span>
    ),
    onClick: () => onCancel?.(),
    negative: true,
  })

  const confirmButton = (labels: SearchWidgetLabels) => ({
    label: labels.common.confirmButton,
    onClick: () => handleConfirm(),
    negative: true,
  })

  const { data, loading, error } = useGetCalendarAvailabilitiesQuery({
    variables: {
      totAdults: adultsValue,
    },
  })

  const availability = data ? toCalendarAvailabilities(data) : []
  const durations = createDurations(availability, durationRange)

  const setDefaultValues = () => {
    dispatch(setDuration(findDuration(durations, first(availability).nights)))
    dispatch(setDate(first(availability).startDateFrom))
  }

  if (
    isNotEmpty(availability) &&
    ((!selectedDuration && !selectedDate) ||
      !isValidCombination(availability, selectedDuration, selectedDate))
  ) {
    setTimeout(() => setDefaultValues())
  }

  return (
    <>
      <SearchWidgetContext.Consumer>
        {(labels) => (
          <div className={classes.root}>
            <div className={classes.stepper}>
              <DotStepper
                totSteps={3}
                activeStep={step}
                color="secondary"
                disabledColor="white"
                padding={theme.spacing(2, 1)}
              />
            </div>
            <div className={classes.content}>
              {step === 0 ? (
                <PeopleStep
                  adultsValue={adultsValue}
                  maxPassengers={maxPassengers}
                  passengerLabels={labels.passengers}
                  onChange={(x) => dispatch(setPassengers(x))}
                />
              ) : undefined}
              {step === 1 ? (
                <>
                  {loading ? (
                    <Loader negative />
                  ) : (
                    <CalendarStep
                      calendarLabels={labels.calendar}
                      loading={loading}
                      availability={availability}
                      selectedDate={selectedDate}
                      durationOptions={durations}
                      selectedDuration={selectedDuration}
                      onDateChange={(x) => dispatch(setDate(x))}
                      onDurationChange={(x) => dispatch(setDuration(x))}
                    />
                  )}
                </>
              ) : undefined}
              {step === 2 ? <DestinationStep /> : undefined}
            </div>
            <PaneActions
              className={classes.actions}
              cancel={cancelButton(labels)}
              ok={confirmButton(labels)}
            />
            <ErrorSnackbar
              condition={error}
              message={labels.messages.apiErrorMessage}
            />
          </div>
        )}
      </SearchWidgetContext.Consumer>
      <SearchWidgetPersister />
    </>
  )
}

SearchWidget.defaultProps = {
  defaultPassengers: 2,
  maxPassengers: 4,
  durationRange: 7,
}

export default SearchWidget
