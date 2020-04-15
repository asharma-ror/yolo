/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StandardHeader
// ====================================================

export interface StandardHeader_prismicStandardHeader_data_body_items_link {
  url: string | null;
  target: string | null;
  id: string | null;
  link_type: string | null;
}

export interface StandardHeader_prismicStandardHeader_data_body_items_name {
  text: string | null;
}

export interface StandardHeader_prismicStandardHeader_data_body_items {
  link: StandardHeader_prismicStandardHeader_data_body_items_link | null;
  name: StandardHeader_prismicStandardHeader_data_body_items_name | null;
}

export interface StandardHeader_prismicStandardHeader_data_body {
  items: (StandardHeader_prismicStandardHeader_data_body_items | null)[] | null;
}

export interface StandardHeader_prismicStandardHeader_data_login_menu_name {
  text: string | null;
}

export interface StandardHeader_prismicStandardHeader_data {
  body: (StandardHeader_prismicStandardHeader_data_body | null)[] | null;
  login_menu_name: StandardHeader_prismicStandardHeader_data_login_menu_name | null;
}

export interface StandardHeader_prismicStandardHeader {
  data: StandardHeader_prismicStandardHeader_data | null;
}

export interface StandardHeader {
  prismicStandardHeader: StandardHeader_prismicStandardHeader | null;
}
