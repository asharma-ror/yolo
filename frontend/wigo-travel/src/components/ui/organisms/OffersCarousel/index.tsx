import { Box } from "@material-ui/core"
import React from "react"
import SlickCarousel from "../../molecules/SlickCarousel"
import OfferCard, { Offer } from "../OfferCard"
import { RichTextField } from "../../molecules/Fields"
import CustomContainer from "../../atoms/CustomContainer"

interface Props {
  data: OffersGroupData
}

const OffersCarousel = ({ data }: Props) => {
  return (
    <Box pb={4} pt={2}>
      <CustomContainer>
        <RichTextField value={data.title} variant="h3" />
      </CustomContainer>
      <SlickCarousel
        dots
        slidesToShowMd={Math.min(4, data.items.length)}
        slidesToShowSm={Math.min(2, data.items.length)}
        slidesToShowXs={1}
        slidePaddingX={15}
      >
        {data.items.map((item, index) => (
          <div key={index}>
            <OfferCard data={item} />
          </div>
        ))}
      </SlickCarousel>
    </Box>
  )
}

export default OffersCarousel

export interface OffersGroupData {
  title?: any
  items: Offer[]
}
