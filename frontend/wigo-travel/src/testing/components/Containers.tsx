import React from "react"
import styled from "styled-components"

interface BackgroundProps {
  primary?: boolean
  padding?: string | number
  children: React.ReactNode
}

export const Background = ({ primary, padding, children }: BackgroundProps) => (
  <div style={{ backgroundColor: primary ? "#ff3333" : "", padding }}>
    {children}
  </div>
)

Background.defaultProps = {
  padding: "1rem",
}

export const FullScreen = styled.div`
  height: 100vh;
  width: 100vw;
`
