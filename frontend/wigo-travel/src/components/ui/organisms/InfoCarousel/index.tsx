import React from "react"
import InfoBox, { InfoBoxData } from "../../molecules/InfoBox"
import { RichTextField } from "../../molecules/Fields"
import { makeStyles, Theme } from "@material-ui/core"
import SlickCarousel from "../../molecules/SlickCarousel"
import CustomContainer from "../../atoms/CustomContainer"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
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

export interface InfoCarouselData {
  title?: any
  subtitle?: any
  boxes: InfoBoxData[]
}

interface Props {
  data: InfoCarouselData
  titlePadding?: string
  subtitlePadding?: string
  boxTitlePadding?: string
  boxBodyPadding?: string
}

const InfoCarousel = ({
  data,
  titlePadding,
  subtitlePadding,
  boxTitlePadding,
  boxBodyPadding,
}: Props) => {
  const classes = useStyles({
    titlePadding,
    subtitlePadding,
  })
  return (
    <div className={classes.root}>
      <CustomContainer>
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
      </CustomContainer>
      <SlickCarousel slidePaddingX={15} dots>
        {data.boxes.map((box, index) => (
          <div key={index}>
            <InfoBox
              className={classes.box}
              data={box}
              titlePadding={boxTitlePadding}
              bodyPadding={boxBodyPadding}
            />
          </div>
        ))}
      </SlickCarousel>
    </div>
  )
}

export default InfoCarousel
