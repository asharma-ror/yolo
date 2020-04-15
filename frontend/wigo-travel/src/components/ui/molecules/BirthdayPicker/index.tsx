import DateFnsUtils from "@date-io/date-fns"
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import { ParsableDate } from "@material-ui/pickers/constants/prop-types"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import React from "react"

interface Props {
  value?: ParsableDate
  label: React.ReactNode
  onChange: (date: MaterialUiPickersDate | null, value?: string | null) => void
}

const BirthdayPicker = ({ value, onChange, label, ...rest }: Props) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        label={label}
        format="dd/MM/yyyy"
        defaultValue={value}
        value={undefined}
        onChange={onChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        {...rest}
      />
    </MuiPickersUtilsProvider>
  )
}

export default BirthdayPicker
