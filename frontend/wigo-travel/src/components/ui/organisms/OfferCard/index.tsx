import { makeStyles } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import offerBoxStyles from "./styles"
import classNames from "classnames"
import CustomCard from "../../molecules/CustomCard"
import BrandLabel from "../../atoms/BrandLabel"
import FavoriteButton from "../../atoms/FavoriteButton"
import ShareButton from "../../atoms/ShareButton"
import { ImageField, RichTextField } from "../../molecules/Fields"
import CustomButton from "../../atoms/CustomButton"
import Stars from "../../molecules/Stars"
import { Treatment, Ranking } from "../../atoms/Icons"

export interface Offer {
  image?: any
  title?: string
  subtitle?: string
  description?: string
  treatment?: {
    name: any
  }
  ranking?: {
    label: string
    value: number
  }
  price?: {
    prefix: any
    value: any
  }
  cta?: {
    link: string
    label: string
  }
}

interface Props {
  data: Offer
  className?: string
}

const useStyles = makeStyles(offerBoxStyles as any)

const OfferCard = ({ data, className }: Props) => {
  const classes = useStyles()
  return (
    <div className={classNames(className, classes.cardContainer)}>
      <CustomCard className={classes.cardMain}>
        <div className={classes.cardHead}>
          <ImageField
            background
            className={classes.cardImage}
            value={data.image}
          >
            <div className={classes.priceContainer}>
              {data.price ? (
                <BrandLabel className={classes.priceLabel}>
                  <RichTextField
                    variant="body1"
                    color="inherit"
                    value={data.price.prefix}
                    className={classes.pricePrefix}
                  />
                  <RichTextField
                    variant="h2"
                    color="inherit"
                    value={data.price.value}
                    className={classes.priceValue}
                  />
                </BrandLabel>
              ) : undefined}
            </div>
            <div className={classes.actionsContainer}>
              <FavoriteButton onClick={() => {}} />
              <ShareButton onClick={() => {}} />
            </div>
          </ImageField>
        </div>
        <div className={classes.cardBody}>
          <div className={classes.topDescription}>
            <RichTextField value={data.title} variant="overline" />
            {data.ranking ? (
              <div className={classes.rankingContainer}>
                <span className={classes.rankingValue}>
                  {data.ranking.value}
                </span>
                <Stars value={data.ranking.value} />
              </div>
            ) : undefined}
          </div>
          <RichTextField variant="h2" weight="normal" value={data.subtitle} />
          <RichTextField variant="body1" value={data.description} />
          <div className={classes.bottomDescription}>
            <div>
              {data.treatment ? (
                <div className={classes.caracheristic}>
                  <Treatment className={classes.caraIcon} />
                  <RichTextField variant="body2" value={data.treatment.name} />
                </div>
              ) : undefined}
              {data.ranking ? (
                <div className={classes.caracheristic}>
                  <Ranking className={classes.caraIcon} />
                  <RichTextField
                    variant="body2"
                    value={`${data.ranking.value ?? ""} ${data.ranking.label}`}
                  />
                </div>
              ) : undefined}
            </div>
            {data.cta ? (
              <Link to={data.cta.link}>
                <CustomButton variant="outlined" color="primary">
                  {data.cta.label}
                </CustomButton>
              </Link>
            ) : undefined}
          </div>
        </div>
      </CustomCard>
    </div>
  )
}

export default OfferCard
