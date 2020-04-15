/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditorialPage
// ====================================================

export interface EditorialPage_prismicEditorialPage_data_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface EditorialPage_prismicEditorialPage_data_content {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface EditorialPage_prismicEditorialPage_data_body_primary_seo_title {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface EditorialPage_prismicEditorialPage_data_body_primary_seo_description {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface EditorialPage_prismicEditorialPage_data_body_primary {
  seo_title: EditorialPage_prismicEditorialPage_data_body_primary_seo_title | null;
  seo_description: EditorialPage_prismicEditorialPage_data_body_primary_seo_description | null;
  seo_no_index: boolean | null;
  seo_no_follow: boolean | null;
}

export interface EditorialPage_prismicEditorialPage_data_body {
  slice_type: string;
  primary: EditorialPage_prismicEditorialPage_data_body_primary | null;
}

export interface EditorialPage_prismicEditorialPage_data {
  title: EditorialPage_prismicEditorialPage_data_title | null;
  content: EditorialPage_prismicEditorialPage_data_content | null;
  body: (EditorialPage_prismicEditorialPage_data_body | null)[] | null;
}

export interface EditorialPage_prismicEditorialPage {
  uid: string | null;
  data: EditorialPage_prismicEditorialPage_data | null;
}

export interface EditorialPage {
  prismicEditorialPage: EditorialPage_prismicEditorialPage | null;
}

export interface EditorialPageVariables {
  uid: string;
}
