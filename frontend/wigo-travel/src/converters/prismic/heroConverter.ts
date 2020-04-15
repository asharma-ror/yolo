import { HeroData, TextStyle } from "../../components/ui/organisms/Hero"
import {
  HomeQuery_prismicHome_data_wide_document as WideDocument,
  HomeQuery_prismicHome_data_wide_document_PrismicHeroImage_data as PrismicHeroImageData,
  HomeQuery_prismicHome_data_wide_document_PrismicHeroImage as PrismicHeroImage,
} from "../../__generated__/HomeQuery"

const heroData = (
  item: WideDocument | null | undefined
): PrismicHeroImageData | null | undefined => {
  return item ? (item as PrismicHeroImage)?.data : undefined
}

export const toHeroData = (
  hero: WideDocument | null | undefined,
  ctaAction?: () => void
): HeroData | undefined =>
  hero
    ? {
        backgroundImage: heroData(hero)?.image?.localFile,
        title: heroData(hero)?.title,
        subtitle: heroData(hero)?.subtitle,
        cta: {
          label: heroData(hero)?.cta_name?.text ?? "",
          link: heroData(hero)?.cta_link,
          action: ctaAction,
        },
        layout: {
          titleStyle: heroData(hero)?.title_style as TextStyle,
          subtitleStyle: heroData(hero)?.subtitle_style as TextStyle,
        },
      }
    : undefined
