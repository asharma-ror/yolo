import React from "react"
import classNames from "classnames"
import {
  makeStyles,
  FormControl,
  Select,
  MenuItem,
  useTheme,
  Theme,
} from "@material-ui/core"
import { getColorContrast, getColor } from "../../../../utils/themeUtils"

export type DropDownColor = "primary" | "secondary"
export type DropDownVariant = "standard" | "outlined" | "filled"
export type DropDownSize = "small" | "medium"

interface Props {
  color: DropDownColor
  bold?: boolean
  fontSize?: string
  variant: DropDownVariant
  size: DropDownSize
  negative?: boolean
  disabled?: boolean
  error?: boolean
  fullWidth?: boolean
  value?: SelectItem
  values: SelectItem[]
  emptyValue?: boolean
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onValueChange?: (selectedValue?: SelectItem) => void
  className?: string
  selectClassName?: string
}

export interface SelectItem {
  id: string
  label: React.ReactNode
}

const useStyles = makeStyles(() => ({
  select: {
    fontSize: (props: any) => props.fontSize,
    fontWeight: (props: any) => props.fontWeight,
    color: (props: any) =>
      props.fontColor ? `${props.fontColor}!important` : undefined,
    "& svg": {
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
    "&:hover fieldset": {
      borderColor: (props: any) =>
        props.borderHoverColor
          ? `${props.borderHoverColor}!important`
          : undefined,
    },
  },
}))

const getBorderColor = (
  theme: Theme,
  color: DropDownColor,
  negative?: boolean
) => (negative ? getColorContrast(theme, color) : undefined)

const getMainColor = (theme: Theme, color: DropDownColor, negative?: boolean) =>
  negative ? getColorContrast(theme, color) : getColor(theme, color)

const CustomDropdown = ({
  color,
  bold,
  fontSize,
  variant,
  size,
  negative,
  disabled,
  error,
  fullWidth,
  value,
  values,
  emptyValue,
  onChange,
  onValueChange,
  className,
  selectClassName,
}: Props) => {
  const theme = useTheme()
  const classes = useStyles({
    fontSize,
    fontWeight: bold === true ? "bold" : undefined,
    fontColor: getBorderColor(theme, color, negative),
    borderColor: getBorderColor(theme, color, negative),
    borderHoverColor: getMainColor(theme, color, negative),
  })

  const getSelectedValue = (id: string) => values.find((x) => x.id === id)

  const handleChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event)
    }
    if (onValueChange) {
      onValueChange(getSelectedValue(event.target.value))
    }
  }

  return (
    <FormControl
      size={size}
      color={negative ? undefined : color}
      className={className}
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
    >
      <Select
        variant={variant}
        value={value?.id}
        onChange={handleChanged}
        displayEmpty={emptyValue}
        className={classNames(selectClassName, classes.select)}
      >
        {emptyValue ? <MenuItem /> : undefined}
        {values.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

CustomDropdown.defaultProps = {
  color: "primary",
  variant: "outlined",
  size: "small",
}

export default CustomDropdown
