/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductBySlug
// ====================================================

export interface ProductBySlug_prismicProduct_data_description {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface ProductBySlug_prismicProduct_data_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface ProductBySlug_prismicProduct_data_wide_document_PrismicCommonIcons {}

export interface ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_image_localFile_childImageSharp_fluid {
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

export interface ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_image_localFile_childImageSharp {
  fluid: ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_image_localFile_childImageSharp_fluid | null;
}

export interface ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_image_localFile {
  childImageSharp: ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_image_localFile_childImageSharp | null;
}

export interface ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_image {
  alt: string | null;
  localFile: ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_image_localFile | null;
}

export interface ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_subtitle {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_title {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data {
  image: ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_image | null;
  subtitle: ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_subtitle | null;
  title: ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data_title | null;
}

export interface ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage {
  data: ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage_data | null;
}

export type ProductBySlug_prismicProduct_data_wide_document = ProductBySlug_prismicProduct_data_wide_document_PrismicCommonIcons | ProductBySlug_prismicProduct_data_wide_document_PrismicHeroImage;

export interface ProductBySlug_prismicProduct_data_wide {
  /**
   * If a Document link, the linked document's Prismic ID.
   */
  id: string | null;
  /**
   * If a Document link, the linked document.
   */
  document: ProductBySlug_prismicProduct_data_wide_document | null;
}

export interface ProductBySlug_prismicProduct_data_airport_info {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface ProductBySlug_prismicProduct_data_duration_info {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface ProductBySlug_prismicProduct_data_people_info {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface ProductBySlug_prismicProduct_data_price_info {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface ProductBySlug_prismicProduct_data_week_info {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicCommonIcons {}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_description {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_name {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_image_localFile_childImageSharp_fluid {
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_image_localFile_childImageSharp {
  fluid: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_image_localFile_childImageSharp_fluid | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_image_localFile {
  childImageSharp: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_image_localFile_childImageSharp | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_image {
  localFile: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_image_localFile | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicCommonIcons {}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_name {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_gallery_image_localFile_childImageSharp_fluid {
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_gallery_image_localFile_childImageSharp {
  fluid: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_gallery_image_localFile_childImageSharp_fluid | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_gallery_image_localFile {
  childImageSharp: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_gallery_image_localFile_childImageSharp | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_gallery_image {
  localFile: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_gallery_image_localFile | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_gallery {
  image: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_gallery_image | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_description {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_coordinates {
  /**
   * The longitude value of the geo-coordinate.
   */
  longitude: number | null;
  /**
   * The latitude value of the geo-coordinate.
   */
  latitude: number | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_cover_image_localFile_childImageSharp_fluid {
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_cover_image_localFile_childImageSharp {
  fluid: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_cover_image_localFile_childImageSharp_fluid | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_cover_image_localFile {
  childImageSharp: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_cover_image_localFile_childImageSharp | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_cover_image {
  localFile: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_cover_image_localFile | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data {
  name: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_name | null;
  gallery: (ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_gallery | null)[] | null;
  description: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_description | null;
  coordinates: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_coordinates | null;
  cover_image: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data_cover_image | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel {
  id: string;
  data: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel_data | null;
}

export type ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document = ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicCommonIcons | ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document_PrismicHotel;

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel {
  /**
   * If a Document link, the linked document.
   */
  document: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel_document | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels {
  hotel: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels_hotel | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data {
  description: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_description | null;
  name: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_name | null;
  image: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_image | null;
  hotels: (ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data_hotels | null)[] | null;
}

export interface ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination {
  data: ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination_data | null;
}

export type ProductBySlug_prismicProduct_data_destinations_destination_document = ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicCommonIcons | ProductBySlug_prismicProduct_data_destinations_destination_document_PrismicProductDestination;

export interface ProductBySlug_prismicProduct_data_destinations_destination {
  /**
   * If a Document link, the linked document's Prismic ID.
   */
  id: string | null;
  /**
   * If a Document link, the linked document.
   */
  document: ProductBySlug_prismicProduct_data_destinations_destination_document | null;
}

export interface ProductBySlug_prismicProduct_data_destinations {
  destination: ProductBySlug_prismicProduct_data_destinations_destination | null;
}

export interface ProductBySlug_prismicProduct_data {
  product_id: string | null;
  description: ProductBySlug_prismicProduct_data_description | null;
  title: ProductBySlug_prismicProduct_data_title | null;
  wide: ProductBySlug_prismicProduct_data_wide | null;
  airport_info: ProductBySlug_prismicProduct_data_airport_info | null;
  duration_info: ProductBySlug_prismicProduct_data_duration_info | null;
  people_info: ProductBySlug_prismicProduct_data_people_info | null;
  price_info: ProductBySlug_prismicProduct_data_price_info | null;
  week_info: ProductBySlug_prismicProduct_data_week_info | null;
  destinations: (ProductBySlug_prismicProduct_data_destinations | null)[] | null;
}

export interface ProductBySlug_prismicProduct {
  uid: string | null;
  data: ProductBySlug_prismicProduct_data | null;
}

export interface ProductBySlug {
  prismicProduct: ProductBySlug_prismicProduct | null;
}

export interface ProductBySlugVariables {
  uid: string;
}
