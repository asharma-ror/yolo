import { makeStyles, Box, Button, Container } from "@material-ui/core"
import React from "react"
import classNames from "classnames"
import { RichTextField, LinkField } from "../../../ui/molecules/Fields"
import { heroStyles } from "./styles"
import HeroLayout from "./layout"

const useStyles = makeStyles(heroStyles as any)

export type TextStyle =
  | "alignLeft"
  | "center"
  | "alignRight"
  | "leftColumn"
  | "rightColumn"

export interface HeroData {
  title?: any
  subtitle?: any
  backgroundImage: any
  cta?: {
    label: string
    link?: any
    action?: () => void
  }
  layout: {
    titleStyle?: TextStyle
    subtitleStyle?: TextStyle
    height?: string
    minHeight?: string
    maxHeight?: string
  }
}

interface Props {
  data: HeroData
}

const CTA = ({ onClick, ctaLabel }: any) => {
  const classes = useStyles()
  return (
    <Button
      fullWidth
      onClick={onClick}
      variant="contained"
      color="primary"
      size="large"
      className={classes.cta}
    >
      {ctaLabel}
    </Button>
  )
}

const Hero = ({ data }: Props) => {
  const classes = useStyles()
  const titleClasses = classNames(classes.claimTitle, {
    [classes.titleAlignLeft]: data.layout.titleStyle === "alignLeft",
    [classes.titleAlignRight]: data.layout.titleStyle === "alignRight",
    [classes.titleCenter]: data.layout.titleStyle === "center",
    [classes.titleLeftColumn]: data.layout.titleStyle === "leftColumn",
    [classes.titleRightColumn]: data.layout.titleStyle === "rightColumn",
  })
  const subtitleClasses = classNames(classes.claimTitle, {
    [classes.subtitleAlignLeft]: data.layout.subtitleStyle === "alignLeft",
    [classes.subtitleAlignRight]: data.layout.subtitleStyle === "alignRight",
    [classes.subtitleCenter]: data.layout.subtitleStyle === "center",
    [classes.subtitleLeftColumn]: data.layout.subtitleStyle === "leftColumn",
    [classes.subtitleRightColumn]: data.layout.subtitleStyle === "rightColumn",
  })
  return (
    <HeroLayout
      backgroundImage={data.backgroundImage}
      height={data.layout.height}
      minHeight={data.layout.minHeight}
      maxHeight={data.layout.maxHeight}
    >
      <Container maxWidth="sm">
        <RichTextField
          value={data.title}
          variant="h1"
          color="white"
          className={titleClasses}
        />
        <RichTextField
          value={data.subtitle}
          variant="subtitle2"
          color="white"
          className={subtitleClasses}
        />
        {data.cta ? (
          data.cta.action ? (
            <Box className={classes.ctaContainer}>
              <CTA ctaLabel={data.cta.label} onClick={data.cta.action}></CTA>
            </Box>
          ) : (
            <Box className={classes.ctaContainer}>
              <LinkField value={data.cta.link}>
                <CTA ctaLabel={data.cta.label}></CTA>
              </LinkField>
            </Box>
          )
        ) : undefined}
      </Container>
    </HeroLayout>
  )
}

Hero.defaultProps = {
  titleStyle: "center",
  subtitleStyle: "center",
}

export default Hero
