import DateFnsUtils from "@date-io/date-fns"
import {
  Calendar,
  MuiPickersUtilsProvider,
  useStaticState,
} from "@material-ui/pickers"
import React, { useState } from "react"

// function getRandomNumber(min: number, max: number) {
//   return Math.round(Math.random() * (max - min) + min)
// }

const DateRangeCalendarPicker = () => {
  //   const [selectedDays, setSelectedDays] = useState([1, 2, 15])
  //   const [selectedDate, handleDateChange] = useState(new Date())

  //   const handleMonthChange = async () => {
  //     // just select random days to simulate server side based data
  //     return new Promise(resolve => {
  //       setTimeout(() => {
  //         setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)))
  //         resolve()
  //       }, 1000)
  //     })
  //   }

  const [value] = useState(new Date())

  const { pickerProps } = useStaticState({
    value,
    onChange: () => {},
  })

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Calendar {...pickerProps} />
      {/* <DatePicker
      
        value={selectedDate}
        onChange={event => console.log("changed", event)}
        onMonthChange={envent => console.log("month changed", event)}
        // onChange={handleDateChange}
        // onMonthChange={handleMonthChange}
        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
          //const date = makeJSDateObject(day); // skip this step, it is required to support date libs
          const date = day?.getDate()
          const isSelected = true //isInCurrentMonth && selectedDays.includes(date.tou)

          // You can also use our internal <Day /> component
          return (
            <Badge badgeContent={isSelected ? "🌚" : undefined}>
              {dayComponent}
            </Badge>
          )
        }} */}
      {/* /> */}
    </MuiPickersUtilsProvider>
  )
}

export default DateRangeCalendarPicker
