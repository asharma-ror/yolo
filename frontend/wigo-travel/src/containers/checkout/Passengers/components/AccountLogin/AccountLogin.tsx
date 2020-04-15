import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core"
import React from "react"
import LoginForm from "../../../../../components/sections/account/LoginForm/LoginForm"

const AccountLogin = () => {
  const [value, setValue] = React.useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.toLowerCase() === "true")
  }
  return (
    <div>
      <FormControl>
        <RadioGroup
          aria-label="account"
          value={value}
          onChange={handleChange}
          row
        >
          <FormControlLabel value={true} control={<Radio />} label="Si" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      {value ? <LoginForm /> : undefined}
    </div>
  )
}

export default AccountLogin
