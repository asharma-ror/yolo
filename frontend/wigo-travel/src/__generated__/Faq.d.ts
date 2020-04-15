/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Faq
// ====================================================

export interface Faq_prismicFaqPage_data_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface Faq_prismicFaqPage_data_description {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface Faq_prismicFaqPage_data_body_primary_seo_title {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface Faq_prismicFaqPage_data_body_primary_seo_description {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface Faq_prismicFaqPage_data_body_primary {
  seo_title: Faq_prismicFaqPage_data_body_primary_seo_title | null;
  seo_description: Faq_prismicFaqPage_data_body_primary_seo_description | null;
  seo_no_index: boolean | null;
  seo_no_follow: boolean | null;
}

export interface Faq_prismicFaqPage_data_body {
  slice_type: string;
  primary: Faq_prismicFaqPage_data_body_primary | null;
}

export interface Faq_prismicFaqPage_data_body1_items_question {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface Faq_prismicFaqPage_data_body1_items_answer {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface Faq_prismicFaqPage_data_body1_items {
  question: Faq_prismicFaqPage_data_body1_items_question | null;
  answer: Faq_prismicFaqPage_data_body1_items_answer | null;
}

export interface Faq_prismicFaqPage_data_body1 {
  items: (Faq_prismicFaqPage_data_body1_items | null)[] | null;
}

export interface Faq_prismicFaqPage_data {
  title: Faq_prismicFaqPage_data_title | null;
  description: Faq_prismicFaqPage_data_description | null;
  body: (Faq_prismicFaqPage_data_body | null)[] | null;
  body1: (Faq_prismicFaqPage_data_body1 | null)[] | null;
}

export interface Faq_prismicFaqPage {
  data: Faq_prismicFaqPage_data | null;
}

export interface Faq {
  prismicFaqPage: Faq_prismicFaqPage | null;
}
