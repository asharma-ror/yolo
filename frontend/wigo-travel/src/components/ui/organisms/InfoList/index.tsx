import React from "react"
import InfoBox, { InfoBoxData } from "../../molecules/InfoBox"
import { RichTextField } from "../../molecules/Fields"
import { Grid, makeStyles, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  title: {
    padding: (props: any) => props.titlePadding,
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    padding: (props: any) => props.bodyPadding,
    marginTop: theme.spacing(1),
  },
  items: {
    marginTop: theme.spacing(4),
  },
  box: {
    marginTop: theme.spacing(2),
  },
}))

export interface InfoListData {
  title?: any
  subtitle?: any
  boxes: InfoBoxData[]
  layout: {
    titlePadding?: string
    subtitlePadding?: string
    boxTitlePadding?: string
    boxBodyPadding?: string
  }
}

interface Props {
  data: InfoListData
}

const InfoList = ({ data }: Props) => {
  const classes = useStyles({
    titlePadding: data.layout.titlePadding,
    subtitlePadding: data.layout.subtitlePadding,
  })
  return (
    <div className={classes.root}>
      <RichTextField
        value={data.title}
        variant="h3"
        className={classes.title}
      />
      <RichTextField
        value={data.subtitle}
        variant="body1"
        className={classes.subtitle}
      />
      <Grid container className={classes.items}>
        {data.boxes.map((x, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <InfoBox
              className={classes.box}
              data={x}
              titlePadding={data.layout.boxTitlePadding}
              bodyPadding={data.layout.boxBodyPadding}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default InfoList
