import React from "react"
import { LogosContext, Logos } from "../../../../context/contents/logosContext"

type LogoColor = "primary" | "light"

interface Props {
  color: LogoColor
  width?: number | string
  maxWidth?: number | string
}

const imgStyle = (maxWidth?: number | string) => ({
  maxWidth: maxWidth ?? "100%",
  height: "auto",
})

const renderLogo = (
  logos: Logos,
  color: LogoColor,
  width?: number | string,
  maxWidth?: number | string
) => {
  switch (color) {
    case "primary":
      return (
        <img
          src={logos.primary.default}
          width={width}
          style={imgStyle(maxWidth)}
        />
      )

    case "light":
      return (
        <img
          src={logos.light.default}
          width={width}
          style={imgStyle(maxWidth)}
        />
      )

    default:
      return undefined
  }
}

const Logo = ({ color, width, maxWidth }: Props) => {
  return (
    <LogosContext.Consumer>
      {(context) => <>{renderLogo(context, color, width, maxWidth)}</>}
    </LogosContext.Consumer>
  )
}

Logo.defaultProps = {
  color: "primary" as LogoColor,
}

export default Logo
