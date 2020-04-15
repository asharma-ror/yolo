import React from "react"
import classNames from "classnames"
import CustomButton from "../../atoms/CustomButton"
import CustomTextInput from "../../atoms/CustomTextInput"
import { makeStyles } from "@material-ui/core"

type InputColor = "primary" | "secondary"

interface Props {
  color?: InputColor
  disabled?: boolean
  required?: boolean
  error?: boolean
  fullWidth?: boolean
  negative?: boolean
  inputPlaceholder: string
  inputRef?: any
  buttonContent: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
}

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  input: {
    paddingTop: 1,
  },
})

const TextInputButton = ({
  color,
  disabled,
  required,
  error,
  fullWidth,
  negative,
  inputPlaceholder,
  inputRef,
  buttonContent,
  onClick,
  className,
}: Props) => {
  const classes = useStyles()
  const elementClasses = classNames(className, {
    [classes.root]: true,
  })
  return (
    <div className={elementClasses}>
      <CustomTextInput
        color={color}
        ref={inputRef}
        fullWidth={fullWidth}
        error={error}
        required={required}
        disabled={disabled}
        label={inputPlaceholder}
        rounding="roundedLeft"
        negative={negative}
        className={classes.input}
      />
      <CustomButton
        color={color}
        rounding="roundedRight"
        disabled={disabled}
        onClick={onClick}
        negative={negative}
      >
        {buttonContent}
      </CustomButton>
    </div>
  )
}

TextInputButton.defaultProps = {
  color: "primary",
}

export default TextInputButton
