import React from "react"
import DefaultLayout from "../../components/layouts/default/DefaultLayout"
import Hero, { HeroData } from "../../components/ui/organisms/Hero"
import OffersCarousel, {
  OffersGroupData,
} from "../../components/ui/organisms/OffersCarousel"
import InfoList, { InfoListData } from "../../components/ui/organisms/InfoList"
import InfoCarousel, {
  InfoCarouselData,
} from "../../components/ui/organisms/InfoCarousel"
import CustomContainer from "../../components/ui/atoms/CustomContainer"

interface Props {
  hero?: HeroData
  contents?: PageContent[]
}

const LandingPageContent = ({ type, data }: PageContent) => {
  switch (type) {
    case "offersGroup":
      return (
        <CustomContainer disableGuttersDown="xs">
          <OffersCarousel data={data as OffersGroupData} />
        </CustomContainer>
      )
    case "infoList":
      return (
        <CustomContainer>
          <InfoList data={data as InfoListData} />
        </CustomContainer>
      )
    case "infoCarousel":
      return (
        <CustomContainer disableGuttersDown="xs">
          {" "}
          <InfoCarousel data={data as InfoCarouselData} />
        </CustomContainer>
      )
    default:
      console.error(`Invalid content type ${type}`)
      return <></>
  }
}

const LandingContainer = ({ hero, contents }: Props) => {
  return (
    <DefaultLayout>
      {hero ? <Hero data={hero} /> : undefined}
      {contents?.map((content, index) => (
        <LandingPageContent key={index} {...content} />
      ))}
    </DefaultLayout>
  )
}

export default LandingContainer

export type LandingContentType = "offersGroup" | "infoList" | "infoCarousel"

export interface PageContent {
  type: LandingContentType
  data: OffersGroupData | InfoListData | InfoCarouselData
}
