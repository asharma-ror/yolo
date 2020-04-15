import React from "react"
import { range } from "../../../../utils/arrayUtils"
import { Star } from "../../atoms/Icons"
import styled from "styled-components"

interface Props {
  value: number
}

const StarsContainer = styled.div`
  display: flex;
`

const Stars = ({ value }: Props) => {
  return (
    <StarsContainer>
      {range(1, Math.floor(value)).map((x) => (
        <Star key={x} />
      ))}
    </StarsContainer>
  )
}

export default Stars
