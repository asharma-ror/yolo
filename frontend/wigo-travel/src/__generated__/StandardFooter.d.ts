/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StandardFooter
// ====================================================

export interface StandardFooter_prismicStandardFooter_data_newsletter_box_title {
  text: string | null;
}

export interface StandardFooter_prismicStandardFooter_data_newsletter_box_disclaimer {
  html: string | null;
}

export interface StandardFooter_prismicStandardFooter_data_newsletter_input_placeholder {
  text: string | null;
}

export interface StandardFooter_prismicStandardFooter_data_newsletter_subscribed_message {
  html: string | null;
}

export interface StandardFooter_prismicStandardFooter_data_company_name {
  text: string | null;
}

export interface StandardFooter_prismicStandardFooter_data_company_info {
  html: string | null;
}

export interface StandardFooter_prismicStandardFooter_data_body_primary_title {
  html: string | null;
}

export interface StandardFooter_prismicStandardFooter_data_body_primary {
  title: StandardFooter_prismicStandardFooter_data_body_primary_title | null;
}

export interface StandardFooter_prismicStandardFooter_data_body_items_icon {
  url: string | null;
}

export interface StandardFooter_prismicStandardFooter_data_body_items_url {
  url: string | null;
}

export interface StandardFooter_prismicStandardFooter_data_body_items {
  icon: StandardFooter_prismicStandardFooter_data_body_items_icon | null;
  url: StandardFooter_prismicStandardFooter_data_body_items_url | null;
}

export interface StandardFooter_prismicStandardFooter_data_body {
  slice_type: string | null;
  primary: StandardFooter_prismicStandardFooter_data_body_primary | null;
  items: (StandardFooter_prismicStandardFooter_data_body_items | null)[] | null;
}

export interface StandardFooter_prismicStandardFooter_data_body1_items_link_address {
  id: string | null;
  url: string | null;
  link_type: string | null;
  target: string | null;
}

export interface StandardFooter_prismicStandardFooter_data_body1_items_link_title {
  text: string | null;
}

export interface StandardFooter_prismicStandardFooter_data_body1_items {
  link_address: StandardFooter_prismicStandardFooter_data_body1_items_link_address | null;
  link_title: StandardFooter_prismicStandardFooter_data_body1_items_link_title | null;
}

export interface StandardFooter_prismicStandardFooter_data_body1 {
  items: (StandardFooter_prismicStandardFooter_data_body1_items | null)[] | null;
}

export interface StandardFooter_prismicStandardFooter_data {
  newsletter_box_title: StandardFooter_prismicStandardFooter_data_newsletter_box_title | null;
  newsletter_box_disclaimer: StandardFooter_prismicStandardFooter_data_newsletter_box_disclaimer | null;
  newsletter_input_placeholder: StandardFooter_prismicStandardFooter_data_newsletter_input_placeholder | null;
  newsletter_subscribed_message: StandardFooter_prismicStandardFooter_data_newsletter_subscribed_message | null;
  company_name: StandardFooter_prismicStandardFooter_data_company_name | null;
  company_info: StandardFooter_prismicStandardFooter_data_company_info | null;
  body: (StandardFooter_prismicStandardFooter_data_body | null)[] | null;
  body1: (StandardFooter_prismicStandardFooter_data_body1 | null)[] | null;
}

export interface StandardFooter_prismicStandardFooter {
  data: StandardFooter_prismicStandardFooter_data | null;
}

export interface StandardFooter_prismicStandardFooterBodySocialLinks_primary_title {
  html: string | null;
}

export interface StandardFooter_prismicStandardFooterBodySocialLinks_primary {
  title: StandardFooter_prismicStandardFooterBodySocialLinks_primary_title | null;
}

export interface StandardFooter_prismicStandardFooterBodySocialLinks_items_icon {
  url: string | null;
}

export interface StandardFooter_prismicStandardFooterBodySocialLinks_items_url {
  url: string | null;
}

export interface StandardFooter_prismicStandardFooterBodySocialLinks_items {
  icon: StandardFooter_prismicStandardFooterBodySocialLinks_items_icon | null;
  url: StandardFooter_prismicStandardFooterBodySocialLinks_items_url | null;
}

export interface StandardFooter_prismicStandardFooterBodySocialLinks {
  primary: StandardFooter_prismicStandardFooterBodySocialLinks_primary | null;
  items: (StandardFooter_prismicStandardFooterBodySocialLinks_items | null)[] | null;
}

export interface StandardFooter {
  prismicStandardFooter: StandardFooter_prismicStandardFooter | null;
  prismicStandardFooterBodySocialLinks: StandardFooter_prismicStandardFooterBodySocialLinks | null;
}
