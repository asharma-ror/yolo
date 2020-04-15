import { Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import { DashboardSummaryData } from "../../../../../api/pricing/types"
import GridContainer from "../../../../../components/ui/Grid/GridContainer"
import GridItem from "../../../../../components/ui/Grid/GridItem"
import SummaryBox from "./components/SummaryBox/SummaryBox"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))

type Props = {
  label: React.ReactNode
  data: DashboardSummaryData
}

const Summary = ({ data, label }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {label}
      </Typography>
      <GridContainer spacing={4}>
        <GridItem xs={12} md={4}>
          <SummaryBox label="Today" data={data.today} />
        </GridItem>
        <GridItem xs={12} md={4}>
          <SummaryBox label="Next Week" data={data.nextWeek} />
        </GridItem>
        <GridItem xs={12} md={4}>
          <SummaryBox label="Closure" data={data.closure} />
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default Summary
