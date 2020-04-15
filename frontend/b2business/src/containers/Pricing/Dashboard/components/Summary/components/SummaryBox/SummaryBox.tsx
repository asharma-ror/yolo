import { Card, Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import * as React from "react"
import { DashboardSummaryValues } from "../../../../../../../api/pricing/types"
import NumericData from "../../../../../../../components/ui/NumericData/NumericData"

interface Props {
  data: DashboardSummaryValues
  label: string
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
  },
  top: {
    padding: theme.spacing(2),
  },
  bottom: {
    width: "100%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  label: {
    marginTop: theme.spacing(2),
  },
  subLabel: {
    marginTop: theme.spacing(2),
    color: theme.palette.grey[600],
    fontWeight: theme.typography.fontWeightRegular,
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 700,
  },
}))

interface WrapperProps {
  children: React.ReactNode
}

const Label = ({ children }: WrapperProps) => {
  const classes = useStyles()
  return (
    <Typography className={classes.label} variant="h5" color="primary">
      {children}
    </Typography>
  )
}

const SubLabel = ({ children }: WrapperProps) => {
  const classes = useStyles()
  return (
    <Typography className={classes.subLabel} variant="h6">
      {children}
    </Typography>
  )
}

const Value = ({ children }: WrapperProps) => {
  const classes = useStyles()
  return (
    <Typography className={classes.title} variant="h5">
      {children}
    </Typography>
  )
}

export default function SummaryBox({ data, label }: Props) {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <Label>{label}</Label>
      <div className={classes.top}>
        <SubLabel>Actual</SubLabel>
        <Value>
          <NumericData data={data.actual} />
        </Value>
      </div>
      <div className={classes.bottom}>
        <div>
          <SubLabel>Last Year</SubLabel>
          <Value>
            <NumericData data={data.lastYear} />
          </Value>
        </div>
        {data.optimal ? (
          <div>
            <SubLabel>Optimal</SubLabel>
            <Value>
              <NumericData data={data.optimal} />
            </Value>
          </div>
        ) : (
          undefined
        )}
      </div>
    </Card>
  )
}
