import React from "react"
import {
  FontColor,
  FontWeight,
  TextVariant,
} from "../../../../../types/theme-types"
import CustomTypography from "../../../atoms/CustomTypography"
import { processHtml, cleanHtml } from "../../../../../utils/htmlUtils"
import { Theme, useTheme } from "@material-ui/core"

interface Props {
  component?: string
  value?: any
  color?: FontColor
  weight?: FontWeight
  variant?: TextVariant
  invalidTags?: string[]
  noHtmlCustomize?: boolean
  className?: any
}

const customizeHtml = (
  value: string,
  variant: string | undefined,
  last: boolean,
  theme: Theme
) => {
  return variant === "h3" && last
    ? `<span style="color: ${theme.palette.primary.main}; text-transform: uppercase">${value}</span>`
    : value
}

const getTextFieldValue = (value: any) => {
  if (!value) {
    return undefined
  }

  /* eslint-disable */
  if (value.hasOwnProperty("html")) {
    return value.html
  }

  /* eslint-disable */
  if (value.hasOwnProperty("text")) {
    return value.text
  }

  return value
}

const RichTextField = ({
  component,
  value,
  color,
  weight,
  variant,
  invalidTags,
  noHtmlCustomize,
  className,
  ...other
}: Props) => {
  const htmlValue = getTextFieldValue(value)
  const theme = useTheme()
  return (
    <>
      {htmlValue ? (
        <CustomTypography
          component={component}
          color={color}
          weight={weight}
          variant={variant}
          className={className}
          innerHtml={processHtml(
            cleanHtml(htmlValue, invalidTags ?? []),
            (x, _, last) =>
              noHtmlCustomize === true
                ? x
                : customizeHtml(x, variant, last, theme)
          )}
          {...other}
        ></CustomTypography>
      ) : (
        undefined
      )}
    </>
  )
}

RichTextField.defaultProps = {
  inherit: "inherit",
  invalidTags: ["p"],
}

export { RichTextField }
