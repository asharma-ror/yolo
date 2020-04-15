import React from "react"
import { Container, Grid } from "@material-ui/core"

interface Props {
  title: React.ReactNode
  info: React.ReactNode
}

const TextInfoBox = ({ title, info }: Props) => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={5}>
          {title}
        </Grid>
        <Grid item xs={7}>
          {info}
        </Grid>
      </Grid>
    </Container>
  )
}

export default TextInfoBox
