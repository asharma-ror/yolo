import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import React, { useState } from "react"
import { randomId } from "../../../../utils/stringUtils"

interface Props {
  value?: string
  size?: "small" | "medium"
  variant?: "standard" | "outlined" | "filled"
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  inputRef?: React.Ref<any>
  inputName?: string
  label?: string
  disabled?: boolean
  error?: boolean
  autoComplete?: string
  fullWidth?: boolean
  required?: boolean
}

const CustomBirthdayPicker = ({
  value,
  size,
  variant,
  onChange,
  inputRef,
  inputName,
  label,
  disabled,
  error,
  autoComplete,
  fullWidth,
  required,
  ...rest
}: Props) => {
  const [selectedDate, setDate] = useState<Date | null>(null)

  const id = randomId()
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        name={inputName}
        inputRef={inputRef}
        id={id}
        clearable
        size={size}
        value={selectedDate}
        inputVariant={variant}
        placeholder={label}
        onChange={(date) => setDate(date)}
        format="dd/MM/yyyy"
        fullWidth
      />
    </MuiPickersUtilsProvider>
  )
}

export default CustomBirthdayPicker
