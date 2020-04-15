/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PrismicLinkTypes } from "./globalTypes";

// ====================================================
// GraphQL query operation: LandingPage
// ====================================================

export interface LandingPage_prismicLandingPage_data_body_primary_seo_title {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface LandingPage_prismicLandingPage_data_body_primary_seo_description {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface LandingPage_prismicLandingPage_data_body_primary {
  seo_title: LandingPage_prismicLandingPage_data_body_primary_seo_title | null;
  seo_description: LandingPage_prismicLandingPage_data_body_primary_seo_description | null;
  seo_no_index: boolean | null;
  seo_no_follow: boolean | null;
}

export interface LandingPage_prismicLandingPage_data_body {
  slice_type: string;
  primary: LandingPage_prismicLandingPage_data_body_primary | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicCommonIcons {}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_content {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_image_localFile_childImageSharp_fixed {
  base64: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_image_localFile_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_image_localFile_childImageSharp {
  fixed: LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_image_localFile_childImageSharp_fixed | null;
  fluid: LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_image_localFile_childImageSharp_fluid | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_image_localFile {
  childImageSharp: LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_image_localFile_childImageSharp | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_image {
  localFile: LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_image_localFile | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes {
  box_content: LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_content | null;
  box_image: LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_image | null;
  box_image_size: string | null;
  box_title: LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes_box_title | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_subtitle {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data {
  box_body_right_padding: string | null;
  box_title_right_padding: string | null;
  boxes: (LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_boxes | null)[] | null;
  title: LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_title | null;
  subtitle: LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data_subtitle | null;
  layout: string | null;
  title_padding_right: string | null;
  subtitle_right_padding: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock {
  id: string;
  data: LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock_data | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicCommonIcons {}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_subtitle {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_cta_text {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_description {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_image_localFile_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_image_localFile_childImageSharp {
  fluid: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_image_localFile_childImageSharp_fluid | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_image_localFile {
  childImageSharp: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_image_localFile_childImageSharp | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_image {
  alt: string | null;
  localFile: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_image_localFile | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_price {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_price_prefix {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicCommonIcons {}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicProduct_data_price_info {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicProduct_data_product_ranking_label {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicProduct_data_treatment_name {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicProduct_data {
  price_info: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicProduct_data_price_info | null;
  product_ranking: number | null;
  product_ranking_label: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicProduct_data_product_ranking_label | null;
  treatment_name: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicProduct_data_treatment_name | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicProduct {
  type: string;
  uid: string | null;
  data: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicProduct_data | null;
}

export type LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document = LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicCommonIcons | LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document_PrismicProduct;

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product {
  /**
   * If a Document link, the linked document.
   */
  document: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product_document | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data {
  title: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_title | null;
  subtitle: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_subtitle | null;
  cta_text: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_cta_text | null;
  description: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_description | null;
  image: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_image | null;
  price: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_price | null;
  price_prefix: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_price_prefix | null;
  product: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data_product | null;
  color: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox {
  data: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox_data | null;
}

export type LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document = LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicCommonIcons | LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document_PrismicOfferBox;

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer {
  /**
   * If a Document link, the linked document.
   */
  document: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer_document | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers {
  offer: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers_offer | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data {
  offers: (LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_offers | null)[] | null;
  title: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data_title | null;
}

export interface LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup {
  id: string;
  data: LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup_data | null;
}

export type LandingPage_prismicLandingPage_data_contents_content_document = LandingPage_prismicLandingPage_data_contents_content_document_PrismicCommonIcons | LandingPage_prismicLandingPage_data_contents_content_document_PrismicInfoBlock | LandingPage_prismicLandingPage_data_contents_content_document_PrismicOffersGroup;

export interface LandingPage_prismicLandingPage_data_contents_content {
  /**
   * If a Document link, the linked document's Prismic custom type API ID
   */
  type: string | null;
  /**
   * If a Document link, the linked document.
   */
  document: LandingPage_prismicLandingPage_data_contents_content_document | null;
}

export interface LandingPage_prismicLandingPage_data_contents {
  content: LandingPage_prismicLandingPage_data_contents_content | null;
}

export interface LandingPage_prismicLandingPage_data_wide_document_PrismicCommonIcons {}

export interface LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_image_localFile_childImageSharp_fluid {
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

export interface LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_image_localFile_childImageSharp {
  fluid: LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_image_localFile_childImageSharp_fluid | null;
}

export interface LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_image_localFile {
  childImageSharp: LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_image_localFile_childImageSharp | null;
}

export interface LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_image {
  alt: string | null;
  localFile: LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_image_localFile | null;
}

export interface LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_subtitle {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_cta_link {
  /**
   * The document's URL derived via the link resolver.
   */
  url: string | null;
  /**
   * The type of link.
   */
  link_type: PrismicLinkTypes;
  /**
   * If a Document link, the linked document's Prismic ID.
   */
  id: string | null;
  /**
   * The link's target.
   */
  target: string | null;
}

export interface LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_cta_name {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data {
  image: LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_image | null;
  subtitle: LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_subtitle | null;
  title: LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_title | null;
  subtitle_style: string | null;
  title_style: string | null;
  cta_link: LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_cta_link | null;
  cta_name: LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data_cta_name | null;
}

export interface LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage {
  data: LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage_data | null;
}

export type LandingPage_prismicLandingPage_data_wide_document = LandingPage_prismicLandingPage_data_wide_document_PrismicCommonIcons | LandingPage_prismicLandingPage_data_wide_document_PrismicHeroImage;

export interface LandingPage_prismicLandingPage_data_wide {
  /**
   * If a Document link, the linked document's Prismic ID.
   */
  id: string | null;
  /**
   * If a Document link, the linked document.
   */
  document: LandingPage_prismicLandingPage_data_wide_document | null;
}

export interface LandingPage_prismicLandingPage_data {
  body: (LandingPage_prismicLandingPage_data_body | null)[] | null;
  contents: (LandingPage_prismicLandingPage_data_contents | null)[] | null;
  wide: LandingPage_prismicLandingPage_data_wide | null;
}

export interface LandingPage_prismicLandingPage {
  uid: string | null;
  data: LandingPage_prismicLandingPage_data | null;
}

export interface LandingPage {
  prismicLandingPage: LandingPage_prismicLandingPage | null;
}

export interface LandingPageVariables {
  uid: string;
}
