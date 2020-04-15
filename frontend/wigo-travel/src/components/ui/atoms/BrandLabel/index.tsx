import React from "react"
import { LogosContext, Logos } from "../../../../context/contents/logosContext"

type LabelColor = "primary" | "light"

interface Props {
  children: React.ReactNode
  className?: string
  color: LabelColor
}

const getImageUrl = (color: LabelColor, logos: Logos) => {
  switch (color) {
    case "primary":
      return logos.primary.background
    case "light":
      return logos.light.background
    default:
      throw new Error(`Invalid label color ${color}`)
  }
}

const buildBackgroundImgStyle = (
  color: LabelColor,
  logos: Logos
): React.CSSProperties => {
  const labelImgUrl = getImageUrl(color, logos)
  return {
    backgroundImage: `url(${labelImgUrl})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "center",
  }
}

const BrandLabel = ({ children, className, color }: Props) => {
  return (
    <LogosContext.Consumer>
      {(context) => (
        <div
          className={className}
          style={buildBackgroundImgStyle(color, context)}
        >
          {children}
        </div>
      )}
    </LogosContext.Consumer>
  )
}

BrandLabel.defaultProps = {
  color: "primary" as LabelColor,
}

export default BrandLabel
