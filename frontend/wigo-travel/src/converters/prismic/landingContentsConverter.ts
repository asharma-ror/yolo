import { OffersGroupData } from "../../components/ui/organisms/OffersCarousel"
import { Offer } from "../../components/ui/organisms/OfferCard"
import { createPagePath } from "../../routing/routing"
import { InfoListData } from "../../components/ui/organisms/InfoList"
import { rightSpacing } from "../../utils/styleUtils"
import { InfoCarouselData } from "../../components/ui/organisms/InfoCarousel"
import {
  HomeQuery_prismicHome_data_contents as HomeDataContents,
  HomeQuery_prismicHome_data_contents_content as HomeDataContentsContent,
  HomeQuery_prismicHome_data_contents_content_document_PrismicInfoBlock as PrismicInfoBlock,
  HomeQuery_prismicHome_data_contents_content_document_PrismicOffersGroup as PrismicOffersGroup,
  HomeQuery_prismicHome_data_contents_content_document_PrismicOffersGroup_data_offers_offer as PrismicOffersGroupOffer,
  HomeQuery_prismicHome_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox as PrismicOfferBox,
  HomeQuery_prismicHome_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product as PrismicOfferBoxProduct,
  HomeQuery_prismicHome_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicProduct as PrismicProduct,
} from "../../__generated__/HomeQuery"
import { PageContent } from "../../containers/landing/LandingContainer"

/* eslint-disable */
const offerDocument = (
  item: PrismicOffersGroupOffer | null | undefined
): PrismicOfferBox | undefined => {
  return item ? (item.document as PrismicOfferBox) : undefined
}

const productDocument = (
  item: PrismicOfferBoxProduct | null | undefined
): PrismicProduct | undefined => {
  return item ? (item.document as PrismicProduct) : undefined
}

const offerProduct = (
  item: PrismicOffersGroupOffer | null | undefined
): PrismicProduct | undefined => {
  return productDocument(offerDocument(item)?.data?.product)
}
/* eslint-enable */

const toOfferGroup = (content: PrismicOffersGroup): PageContent => ({
  type: "offersGroup",
  data: {
    title: content.data?.title,
    items: content.data?.offers?.map(
      (x) =>
        ({
          title: offerDocument(x?.offer)?.data?.title,
          subtitle: offerDocument(x?.offer)?.data?.subtitle,
          description: offerDocument(x?.offer)?.data?.description,
          image: offerDocument(x?.offer)?.data?.image?.localFile
            ?.childImageSharp,
          price: {
            prefix: offerDocument(x?.offer)?.data?.price_prefix,
            value: offerDocument(x?.offer)?.data?.price,
          },
          ranking: offerProduct(x?.offer)?.data?.product_ranking
            ? {
                label: offerProduct(x?.offer)?.data?.product_ranking_label
                  ?.text,
                value: offerProduct(x?.offer)?.data?.product_ranking,
              }
            : undefined,
          treatment: offerProduct(x?.offer)?.data?.treatment_name?.html
            ? {
                name: offerProduct(x?.offer)?.data?.treatment_name,
              }
            : undefined,
          cta: {
            label: offerDocument(x?.offer)?.data?.cta_text?.text,
            link: createPagePath(
              offerDocument(x?.offer)?.data?.product?.document
            ),
          },
        } as Offer)
    ),
  } as OffersGroupData,
})

const boxPadding = (value: string) => {
  switch (value) {
    case "small":
      return rightSpacing("20%")
    case "medium":
      return rightSpacing("40%")
    default:
      return "0"
  }
}

const toInfoList = (content: PrismicInfoBlock): PageContent => ({
  type: "infoList",
  data: {
    title: content.data?.title,
    subtitle: content.data?.subtitle,
    boxes:
      content.data?.boxes?.map((box) => ({
        icon: box?.box_image?.localFile?.childImageSharp,
        title: box?.box_title,
        body: box?.box_content,
      })) ?? [],
    layout: {
      titlePadding: boxPadding(content.data?.title_padding_right ?? "none"),
      subtitlePadding: boxPadding(
        content.data?.subtitle_right_padding ?? "none"
      ),
      boxBodyPadding: boxPadding(
        content.data?.box_body_right_padding ?? "none"
      ),
      boxTitlePadding: boxPadding(
        content.data?.box_title_right_padding ?? "none"
      ),
    },
  } as InfoListData,
})

const toInfoCarousel = (content: PrismicInfoBlock): PageContent => ({
  type: "infoCarousel",
  data: {
    title: content.data?.title,
    subtitle: content.data?.subtitle,
    boxes:
      content.data?.boxes?.map((box) => ({
        icon: box?.box_image?.localFile?.childImageSharp,
        title: box?.box_title,
        body: box?.box_content,
      })) ?? [],
    layout: {
      titlePadding: boxPadding(content.data?.title_padding_right ?? "none"),
      subtitlePadding: boxPadding(
        content.data?.subtitle_right_padding ?? "none"
      ),
      boxBodyPadding: boxPadding(
        content.data?.box_body_right_padding ?? "none"
      ),
      boxTitlePadding: boxPadding(
        content.data?.box_title_right_padding ?? "none"
      ),
    },
  } as InfoCarouselData,
})

const toInfoBlock = (content: PrismicInfoBlock): PageContent =>
  content.data?.layout === "carousel"
    ? toInfoCarousel(content)
    : toInfoList(content)

const toContent = (
  content: HomeDataContentsContent
): PageContent | undefined => {
  switch (content.type) {
    case "offers_group":
      return toOfferGroup(content.document as PrismicOffersGroup)
    case "info_block":
      return toInfoBlock(content.document as PrismicInfoBlock)
    default:
      console.error(`Invalid content type ${content.type}`)
  }
}

export const toContents = (contents: (HomeDataContents | null)[] | null) =>
  contents
    ?.map((x) => toContent(x?.content as HomeDataContentsContent))
    .filter((x) => x !== undefined) as PageContent[]
