import DateFnsUtils from "@date-io/date-fns"
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import React from "react"

interface DateFilterProps {
  label: React.ReactNode
  value?: Date
  onChange?: (date: Date) => void
}

const DateFilter = ({ label, value, onChange }: DateFilterProps) => {
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          label={label}
          format="dd/MM/yyyy"
          value={value}
          onChange={x => console.log(x)}
          animateYearScrolling={false}
        />
      </MuiPickersUtilsProvider>
    </>
  )
}

export default DateFilter
