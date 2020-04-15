import { Box, Grid } from "@material-ui/core"
import React from "react"
import { fakePackageTravelAssignations } from "../../../api/reservations/reservations"
import PapperBlock from "../../../components/ui/PapperBlock/PapperBlock"
import AssignationConfirmation from "./components/AssignationConfirmation/AssignationConfirmation"
import AssignationProgress from "./components/AssignationProgress/AssignationProgress"
import AssignationsHeader from "./components/AssignationsHeader/AssignationsHeader"
import AssignationsTable from "./components/AssignationsTable/AssignationsTable"
import AssignationsContextProvider from "./context/AssignationsContextProvider"

interface Props {}

const AssignationsContainer = ({}: Props) => {
  const data = fakePackageTravelAssignations[0]
  return (
    <AssignationsContextProvider initialAssignationsData={data}>
      <PapperBlock noMargin noDescription whiteBg>
        <Box mb={4}>
          <AssignationsHeader
            productName={data.product.name}
            timeInterval={data.interval}
          ></AssignationsHeader>
        </Box>
        <Box mt={4}>
          <Grid container>
            <Grid item sm={8}>
              <AssignationProgress></AssignationProgress>
            </Grid>
            <Grid item sm={4}>
              <AssignationConfirmation></AssignationConfirmation>
            </Grid>
          </Grid>
        </Box>
        <Box mt={2}>
          <AssignationsTable></AssignationsTable>
        </Box>
      </PapperBlock>
    </AssignationsContextProvider>
  )
}

export default AssignationsContainer
