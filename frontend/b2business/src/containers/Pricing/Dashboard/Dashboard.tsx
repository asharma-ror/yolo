import { Box } from "@material-ui/core"
import React from "react"
import {
  bestTopLevelDestinations,
  criticalTopLevelDestinations,
  fakeDashboardData,
} from "../../../api/pricing/fakeData"
import GridContainer from "../../../components/ui/Grid/GridContainer"
import GridItem from "../../../components/ui/Grid/GridItem"
import PapperBlock from "../../../components/ui/PapperBlock/PapperBlock"
import DashboardFilters from "./components/DashboardFilters/DashboardFilters"
import DestinationRanking from "./components/DestinationRanking/DestinationRanking"
import Summary from "./components/Summary/Summary"

interface Props {}

const DashboardContainer = ({}: Props) => {
  return (
    <>
      <PapperBlock
        noMargin
        title="Pricing Dashboard"
        desc=""
        icon="ios-cash-outline"
        header={<DashboardFilters></DashboardFilters>}
      >
        <Box mb={4}>
          <Summary data={fakeDashboardData.revenue} label="Revenue" />
        </Box>
        <Box>
          <Summary data={fakeDashboardData.loadFactor} label="Load Factor" />
        </Box>
      </PapperBlock>
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <DestinationRanking
            label="Best performing destinations @closure"
            data={bestTopLevelDestinations}
          />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <DestinationRanking
            label="Worst performing destinations @closure"
            data={criticalTopLevelDestinations}
          />
        </GridItem>
      </GridContainer>
    </>
  )
}

export default DashboardContainer
