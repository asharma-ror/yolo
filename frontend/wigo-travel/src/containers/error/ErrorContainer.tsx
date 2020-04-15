import React from "react"
import DefaultLayout from "../../components/layouts/default/DefaultLayout"
import { Container, Box } from "@material-ui/core"
import { RichTextField } from "../../components/ui/molecules/Fields"

interface Props {
  page: any
}

const ErrorContainer = ({ page }: Props) => {
  return (
    <DefaultLayout>
      <Container>
        <Box textAlign="center">
          <RichTextField value={page.data.title} />
          <RichTextField value={page.data.body} />
        </Box>
      </Container>
    </DefaultLayout>
  )
}

export default ErrorContainer
