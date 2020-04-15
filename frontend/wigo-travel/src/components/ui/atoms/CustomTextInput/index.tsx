import React from "react"
import classNames from "classnames"
import {
  TextField as MuiTextField,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core"
import { getColor, getColorContrast } from "../../../../utils/themeUtils"

type InputColor = "primary" | "secondary"
type InputVariant = "filled" | "outlined" | "standard"
type InputSize = "small" | "medium"
type InputRounding = "rounded" | "roundedLeft" | "roundedRight" | "none"

interface Props {
  color: InputColor
  label?: string
  name?: string
  required?: boolean
  variant?: InputVariant
  autoComplete?: string
  size?: InputSize
  rounding?: InputRounding
  fullWidth?: boolean
  disabled?: boolean
  error?: boolean
  negative?: boolean
  ref?: any
  className?: string
}

const useStyles = makeStyles(() => ({
  root: {
    "& label": {
      fontSize: "12px",
      color: (props: any) =>
        props.fontColor ? `${props.fontColor}!important` : undefined,
    },
    "& input": {
      color: (props: any) =>
        props.fontColor ? `${props.fontColor}!important` : undefined,
    },
    "& fieldset": {
      borderColor: (props: any) =>
        props.borderColor ? `${props.borderColor}!important` : undefined,
    },
    "& div:hover fieldset": {
      borderColor: (props: any) =>
        props.borderHoverColor
          ? `${props.borderHoverColor}!important`
          : undefined,
    },
  },
  noRounding: {
    "& fieldset": {
      borderRadius: 0,
    },
  },
  roundedLeft: {
    "& fieldset": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  roundedRight: {
    "& fieldset": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
}))

const getBorderColor = (theme: Theme, color: InputColor, negative?: boolean) =>
  negative ? getColorContrast(theme, color) : undefined

const getMainColor = (theme: Theme, color: InputColor, negative?: boolean) =>
  negative ? getColorContrast(theme, color) : getColor(theme, color)

const CustomTextInput = ({
  color,
  label,
  name,
  required,
  variant,
  autoComplete,
  size,
  fullWidth,
  rounding,
  disabled,
  error,
  negative,
  ref,
  className,
}: Props) => {
  const theme = useTheme()
  const classes = useStyles({
    fontColor: getBorderColor(theme, color, negative),
    borderColor: getBorderColor(theme, color, negative),
    borderHoverColor: getMainColor(theme, color, negative),
  })
  const elementClasses = classNames(className, {
    [classes.root]: true,
    [classes.noRounding]: rounding === "none",
    [classes.roundedLeft]: rounding === "roundedLeft",
    [classes.roundedRight]: rounding === "roundedRight",
  })
  return (
    <MuiTextField
      className={elementClasses}
      color={negative ? undefined : color}
      label={label}
      name={name}
      required={required}
      variant={variant as any}
      disabled={disabled}
      autoComplete={autoComplete}
      fullWidth={fullWidth}
      inputRef={ref}
      error={error}
      size={size}
    />
  )
}

CustomTextInput.defaultProps = {
  color: "primary",
  variant: "outlined",
  size: "small",
  rounding: "rounded",
  negative: false,
}

export default CustomTextInput
