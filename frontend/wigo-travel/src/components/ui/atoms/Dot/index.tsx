import React, { CSSProperties } from "react"
import { useTheme } from "@material-ui/core/styles"
import classNames from "classnames"
import styled from "styled-components"
import { getColor } from "../../../../utils/themeUtils"
import { ThemeColor, ThemeColorVariant } from "../../../../types/theme-types"

interface Props {
  color: ThemeColor
  colorVariant: ThemeColorVariant
  colorValue?: string
  size: string
  onClick?: () => void
  className?: string
  style?: CSSProperties
  children?: React.ReactNode
}

interface DotCircleProps {
  customColor: string
  clickable: boolean
  width: string
}

const DotCircle = styled.span<DotCircleProps>`
  cursor: ${(props) => (props.clickable ? "pointer" : "")};
  background-color: ${(props) => props.customColor};
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface DotContainerProps {
  size: string
}

const DotContainer = styled.div<DotContainerProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`

const Dot = ({
  color,
  colorVariant,
  colorValue,
  size,
  onClick,
  className,
  style,
  children,
}: Props) => {
  const theme = useTheme()
  return (
    <DotContainer size={size} style={style}>
      <DotCircle
        className={classNames("dot", className)}
        onClick={onClick}
        customColor={colorValue ?? getColor(theme, color, colorVariant)}
        clickable={onClick !== undefined}
        width={size}
      >
        {children}
      </DotCircle>
    </DotContainer>
  )
}

Dot.defaultProps = {
  color: "primary",
  colorVariant: "main",
  size: "0.875rem",
}

export default Dot
