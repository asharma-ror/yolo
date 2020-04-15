/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PrismicLinkTypes } from "./globalTypes";

// ====================================================
// GraphQL query operation: DefaultLayoutContents
// ====================================================

export interface DefaultLayoutContents_prismicStandardHeader_data_body_items_link {
  /**
   * The document's URL derived via the link resolver.
   */
  url: string | null;
  /**
   * The link's target.
   */
  target: string | null;
  /**
   * If a Document link, the linked document's Prismic ID.
   */
  id: string | null;
  /**
   * The type of link.
   */
  link_type: PrismicLinkTypes;
}

export interface DefaultLayoutContents_prismicStandardHeader_data_body_items_name {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface DefaultLayoutContents_prismicStandardHeader_data_body_items {
  link: DefaultLayoutContents_prismicStandardHeader_data_body_items_link | null;
  name: DefaultLayoutContents_prismicStandardHeader_data_body_items_name | null;
}

export interface DefaultLayoutContents_prismicStandardHeader_data_body {
  items: (DefaultLayoutContents_prismicStandardHeader_data_body_items | null)[] | null;
}

export interface DefaultLayoutContents_prismicStandardHeader_data_login_menu_name {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface DefaultLayoutContents_prismicStandardHeader_data {
  body: (DefaultLayoutContents_prismicStandardHeader_data_body | null)[] | null;
  login_menu_name: DefaultLayoutContents_prismicStandardHeader_data_login_menu_name | null;
}

export interface DefaultLayoutContents_prismicStandardHeader {
  data: DefaultLayoutContents_prismicStandardHeader_data | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_newsletter_box_title {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_newsletter_box_disclaimer {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_newsletter_input_placeholder {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_newsletter_input_cta_text {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_newsletter_subscribed_message {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_company_name {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_company_info {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_body_primary_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_body_primary {
  title: DefaultLayoutContents_prismicStandardFooter_data_body_primary_title | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_body_items_icon {
  url: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_body_items_url {
  /**
   * The document's URL derived via the link resolver.
   */
  url: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_body_items {
  icon: DefaultLayoutContents_prismicStandardFooter_data_body_items_icon | null;
  url: DefaultLayoutContents_prismicStandardFooter_data_body_items_url | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_body {
  slice_type: string;
  primary: DefaultLayoutContents_prismicStandardFooter_data_body_primary | null;
  items: (DefaultLayoutContents_prismicStandardFooter_data_body_items | null)[] | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_body1_items_link_address {
  /**
   * If a Document link, the linked document's Prismic ID.
   */
  id: string | null;
  /**
   * The document's URL derived via the link resolver.
   */
  url: string | null;
  /**
   * The type of link.
   */
  link_type: PrismicLinkTypes;
  /**
   * The link's target.
   */
  target: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_body1_items_link_title {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_body1_items {
  link_address: DefaultLayoutContents_prismicStandardFooter_data_body1_items_link_address | null;
  link_title: DefaultLayoutContents_prismicStandardFooter_data_body1_items_link_title | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data_body1 {
  items: (DefaultLayoutContents_prismicStandardFooter_data_body1_items | null)[] | null;
}

export interface DefaultLayoutContents_prismicStandardFooter_data {
  newsletter_box_title: DefaultLayoutContents_prismicStandardFooter_data_newsletter_box_title | null;
  newsletter_box_disclaimer: DefaultLayoutContents_prismicStandardFooter_data_newsletter_box_disclaimer | null;
  newsletter_input_placeholder: DefaultLayoutContents_prismicStandardFooter_data_newsletter_input_placeholder | null;
  newsletter_input_cta_text: DefaultLayoutContents_prismicStandardFooter_data_newsletter_input_cta_text | null;
  newsletter_subscribed_message: DefaultLayoutContents_prismicStandardFooter_data_newsletter_subscribed_message | null;
  company_name: DefaultLayoutContents_prismicStandardFooter_data_company_name | null;
  company_info: DefaultLayoutContents_prismicStandardFooter_data_company_info | null;
  body: (DefaultLayoutContents_prismicStandardFooter_data_body | null)[] | null;
  body1: (DefaultLayoutContents_prismicStandardFooter_data_body1 | null)[] | null;
}

export interface DefaultLayoutContents_prismicStandardFooter {
  data: DefaultLayoutContents_prismicStandardFooter_data | null;
}

export interface DefaultLayoutContents_prismicStandardFooterBodySocialLinks_primary_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooterBodySocialLinks_primary {
  title: DefaultLayoutContents_prismicStandardFooterBodySocialLinks_primary_title | null;
}

export interface DefaultLayoutContents_prismicStandardFooterBodySocialLinks_items_icon {
  url: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooterBodySocialLinks_items_url {
  /**
   * The document's URL derived via the link resolver.
   */
  url: string | null;
}

export interface DefaultLayoutContents_prismicStandardFooterBodySocialLinks_items {
  icon: DefaultLayoutContents_prismicStandardFooterBodySocialLinks_items_icon | null;
  url: DefaultLayoutContents_prismicStandardFooterBodySocialLinks_items_url | null;
}

export interface DefaultLayoutContents_prismicStandardFooterBodySocialLinks {
  primary: DefaultLayoutContents_prismicStandardFooterBodySocialLinks_primary | null;
  items: (DefaultLayoutContents_prismicStandardFooterBodySocialLinks_items | null)[] | null;
}

export interface DefaultLayoutContents {
  prismicStandardHeader: DefaultLayoutContents_prismicStandardHeader | null;
  prismicStandardFooter: DefaultLayoutContents_prismicStandardFooter | null;
  prismicStandardFooterBodySocialLinks: DefaultLayoutContents_prismicStandardFooterBodySocialLinks | null;
}
