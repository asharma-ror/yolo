import React from "react"
import Swiper from "react-id-swiper"

interface Props {
  children: any
  minSlides?: number
  maxSlides?: number
}

const defaultProps = {
  minSlides: 1,
  maxSlides: 2,
}

export default function SwiperCarousel({
  children,
  minSlides = defaultProps.minSlides,
  maxSlides = defaultProps.maxSlides,
  ...rest
}: Props) {
  const swiperParams = {
    slidesPerView: maxSlides,
    spaceBetween: 40,
    grabCursor: true,
    loop: true,
    breakpoints: {
      1024: {
        slidesPerView: maxSlides,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: maxSlides,
        spaceBetween: 40,
      },
      640: {
        slidesPerView: minSlides,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: minSlides,
        spaceBetween: 10,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  }
  return (
    <Swiper {...rest} {...swiperParams}>
      {children}
    </Swiper>
  )
}
