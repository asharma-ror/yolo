/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ErrorPage
// ====================================================

export interface ErrorPage_prismicErrorPage_data_body {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface ErrorPage_prismicErrorPage_data_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface ErrorPage_prismicErrorPage_data {
  body: ErrorPage_prismicErrorPage_data_body | null;
  title: ErrorPage_prismicErrorPage_data_title | null;
}

export interface ErrorPage_prismicErrorPage {
  uid: string | null;
  data: ErrorPage_prismicErrorPage_data | null;
}

export interface ErrorPage {
  prismicErrorPage: ErrorPage_prismicErrorPage | null;
}

export interface ErrorPageVariables {
  uid: string;
}
