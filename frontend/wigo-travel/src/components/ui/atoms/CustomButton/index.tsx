import React from "react"
import classNames from "classnames"
import { Button as MuiButton, makeStyles, Theme, fade } from "@material-ui/core"
import { getColorContrast, getColor } from "../../../../utils/themeUtils"

export type ButtonColor = "inherit" | "primary" | "secondary" | "default"
export type ButtonVariant = "text" | "outlined" | "contained"
export type ButtonSize = "small" | "medium" | "large"
export type ButtonRounding = "rounded" | "roundedLeft" | "roundedRight" | "none"

interface Props {
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  rounding?: ButtonRounding
  negative?: boolean
  disabled?: boolean
  fullWidth?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
  className?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  textNegative: {
    color: (props: any) => getColorContrast(theme, props.color),
  },
  containedNegative: {
    backgroundColor: (props: any) => getColorContrast(theme, props.color),
    color: (props: any) => getColor(theme, props.color),
    "&:hover": {
      backgroundColor: (props: any) =>
        fade(getColorContrast(theme, props.color), 0.8),
    },
  },
  noRounding: {
    borderRadius: 0,
  },
  roundedLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  roundedRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}))

const CustomButton = ({
  color,
  variant,
  size,
  rounding,
  negative,
  disabled,
  fullWidth,
  onClick,
  children,
  className,
}: Props) => {
  const classes = useStyles({
    color,
    negative,
  })
  const elementClasses = classNames(className, {
    [classes.containedNegative]: negative && variant === "contained",
    [classes.textNegative]: negative && variant === "text",
    [classes.noRounding]: rounding === "none",
    [classes.roundedLeft]: rounding === "roundedLeft",
    [classes.roundedRight]: rounding === "roundedRight",
  })
  return (
    <MuiButton
      className={elementClasses}
      color={color}
      disabled={disabled}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  )
}

CustomButton.defaultProps = {
  color: "primary",
  variant: "contained",
  rounding: "rounded",
}

export default CustomButton
