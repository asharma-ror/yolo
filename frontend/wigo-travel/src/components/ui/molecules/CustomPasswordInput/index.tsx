import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Theme,
} from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import { randomId } from "../../../../utils/stringUtils"

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    backgroundColor: theme.palette.common.white,
    paddingRight: "0.5rem",
  },
}))

interface State {
  password: string
  showPassword: boolean
}

interface Props {
  value?: string
  size?: "small" | "medium"
  variant?: "standard" | "outlined" | "filled"
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  label?: React.ReactNode
  autoComplete?: string
  fullWidth?: boolean
  required?: boolean
  register: any
  name: string
  error: boolean
}

const CustomPasswordInput = ({
  value,
  size,
  variant,
  onChange,
  label,
  autoComplete,
  fullWidth,
  required,
  register,
  name,
  error,
  ...rest
}: Props) => {
  const classes = useStyles()
  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  })

  const id = randomId()

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value })
    if (onChange) {
      onChange(event)
    }
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <FormControl
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      required={required}
      {...rest}
    >
      <InputLabel htmlFor={id} className={classes.label}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        error={error}
        name={name || "password"}
        inputRef={register}
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        autoComplete={autoComplete}
        defaultValue={value}
        onChange={handleChange("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
    </FormControl>
  )
}

export default CustomPasswordInput
