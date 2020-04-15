import React from "react"
import { makeStyles } from "@material-ui/core"
import { RichTextField } from "../../../molecules/Fields"
import MonthsDropdown from "../../../molecules/MonthsDropdown"
import CustomDropdown from "../../../atoms/CustomDropdown"
import { DurationRange } from "../../../../../features/search/searchTypes"
import RangeDayPicker from "../../../molecules/RangeDayPicker"

interface DurationOption {
  id: string
  value: DurationRange
  label: React.ReactNode
}

interface Props {
  label: any
  minDate: Date
  maxDate: Date
  date?: Date
  durations: DurationRange[]
  duration?: DurationRange
  durationLabel: (element: DurationRange) => React.ReactElement | string
  onDateChange: (value: Date | undefined) => void
  onDurationChange: (value: DurationRange | undefined) => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 1),
  },
  title: {
    marginBottom: theme.spacing(2),
    marginRight: "20%",
  },
  fieldGroup: {
    display: "flex",
    margin: theme.spacing(1, 0),
  },
  months: {
    textTransform: "uppercase",
  },
}))

const createOption = (
  range: DurationRange,
  durationLabel: (element: DurationRange) => React.ReactElement | string
): DurationOption => ({
  id: `${range.minNights}-${range.maxNights}`,
  value: range,
  label: durationLabel(range),
})

const SearchCalendarFilter = ({
  label,
  minDate,
  maxDate,
  date,
  durations,
  duration,
  durationLabel,
  onDateChange,
  onDurationChange,
}: Props) => {
  const classes = useStyles()
  const durationOptions = durations.map((x) => createOption(x, durationLabel))
  const durationOption = duration
    ? createOption(duration, durationLabel)
    : undefined

  const handleDateChanged = (value: Date) => {
    if (onDateChange) {
      onDateChange(value)
    }
  }

  const handleDurationChanged = (option: DurationOption) => {
    if (onDurationChange) {
      onDurationChange(option.value)
    }
  }

  return (
    <div className={classes.root}>
      <RichTextField
        variant="h2"
        value={label}
        className={classes.title}
        color="white"
      />
      <div className={classes.fieldGroup}>
        <MonthsDropdown
          negative
          bold
          minDate={minDate}
          maxDate={maxDate}
          value={date}
          onChange={handleDateChanged}
          fullWidth
          monthsClassName={classes.months}
        />
      </div>
      <div className={classes.fieldGroup}>
        <CustomDropdown
          negative
          bold
          value={durationOption}
          values={durationOptions}
          onValueChange={handleDurationChanged}
          fullWidth
        />
      </div>
      {durationOption ? (
        <div>
          <RangeDayPicker
            hideHeader
            fullWidth
            ranges={[]}
            onDateRangeChanged={(x) => console.log("date changed", x)}
          />
        </div>
      ) : undefined}
    </div>
  )
}

export default SearchCalendarFilter
