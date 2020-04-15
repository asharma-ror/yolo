import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal"
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat"
import HotelIcon from "@material-ui/icons/Hotel"
import React from "react"
import { ProductType } from "../../../../api/products/types"

interface Props {
  type: ProductType
}

const ProductTypeIcon = ({ type }: Props) => {
  switch (type) {
    case "flight":
      return <AirlineSeatReclineNormalIcon></AirlineSeatReclineNormalIcon>
    case "ferry":
      return <DirectionsBoatIcon></DirectionsBoatIcon>
    case "hotel":
      return <HotelIcon></HotelIcon>
    case "package":
      return <HotelIcon></HotelIcon>
    default:
      return <></>
  }
}

export default ProductTypeIcon
