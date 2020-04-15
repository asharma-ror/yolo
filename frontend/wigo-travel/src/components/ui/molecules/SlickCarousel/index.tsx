import { Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import Slider, { Settings } from "react-slick"
import Dot from "../../atoms/Dot"

interface StylesProps {
  marginBottom: number
  dotsPosition: DotsPosition
  slidePaddingX: number | undefined
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: (props: StylesProps) => theme.spacing(props.marginBottom),
  },
  slideContainer: {
    paddingLeft: (props: StylesProps) => props.slidePaddingX,
    paddingRight: (props: StylesProps) => props.slidePaddingX,
    "&:focus": {
      outline: "none",
    },
  },
  slider: {
    "& .slick-active .dot": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  sliderDotsContainer: {
    paddingLeft: (props: StylesProps) => props.slidePaddingX,
    paddingRight: (props: StylesProps) => props.slidePaddingX,
    textAlign: (props: StylesProps) => props.dotsPosition,

    "& > li": {
      marginLeft: "0 !important",
    },
  },
}))

type DotsPosition = "left" | "right" | "center"

interface Props {
  children: React.ReactNodeArray
  slidesToShowXs?: number
  slidesToShowSm?: number
  slidesToShowMd?: number
  dots?: boolean
  dotsPosition?: DotsPosition
  nextSlidePreview?: boolean
  centerPadding?: number
  slidePaddingX?: number
  slideNextOnCkick?: boolean
}

const SlickCarousel = ({
  children,
  slidesToShowXs,
  slidesToShowSm,
  slidesToShowMd,
  dots,
  nextSlidePreview,
  dotsPosition,
  centerPadding,
  slidePaddingX,
  slideNextOnCkick,
}: Props) => {
  const centerPaddingMd = () => (centerPadding ? (centerPadding * 2) / 3 : 0)
  const centerPaddingSm = () => (centerPadding ? centerPadding / 2 : 0)
  const classes = useStyles({
    marginBottom: dots ? 3 : 0,
    dotsPosition,
    slidePaddingX,
  })
  const settings: Settings = {
    className: classes.slider,
    centerMode: nextSlidePreview ?? false,
    centerPadding: nextSlidePreview
      ? `${centerPadding}px ${centerPadding}px ${centerPadding}px 0`
      : "0",
    slidesToShow: slidesToShowMd,
    dots: dots,
    customPaging: () => <Dot color="secondary" />,
    appendDots: (dots) => (
      <div>
        <div className={classes.sliderDotsContainer}>{dots}</div>
      </div>
    ),
    cssEase: "linear",
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: nextSlidePreview ?? false,
          centerPadding: nextSlidePreview
            ? `${centerPaddingMd()}px ${centerPaddingMd()}px ${centerPaddingMd()}px 0`
            : "0",
          slidesToShow: slidesToShowSm,
          dots: dots,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: nextSlidePreview ?? false,
          centerPadding: nextSlidePreview
            ? `${centerPaddingSm()}px ${centerPaddingSm()}px ${centerPaddingSm()}px 0`
            : "0",
          slidesToShow: slidesToShowXs,
          dots: dots,
        },
      },
    ],
  }
  const slider = React.createRef<Slider>()
  const slideClickHandler = () => slider.current?.slickNext()

  return (
    <Slider className={classes.root} {...settings} ref={slider}>
      {children.map((node, index) => (
        <div
          key={index}
          className={classes.slideContainer}
          onClick={slideNextOnCkick ? slideClickHandler : undefined}
        >
          {node}
        </div>
      ))}
    </Slider>
  )
}

SlickCarousel.defaultProps = {
  slidesToShowXs: 1,
  slidesToShowSm: 2,
  slidesToShowMd: 3,
  centerPadding: 60,
  dotsPosition: "left",
}

export default SlickCarousel
