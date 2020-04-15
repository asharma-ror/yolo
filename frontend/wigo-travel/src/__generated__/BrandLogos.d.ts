/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BrandLogos
// ====================================================

export interface BrandLogos_prismicLogos_data_primary {
  url: string | null;
}

export interface BrandLogos_prismicLogos_data_primary_background {
  url: string | null;
}

export interface BrandLogos_prismicLogos_data_primary_negative {
  url: string | null;
}

export interface BrandLogos_prismicLogos_data_light {
  url: string | null;
}

export interface BrandLogos_prismicLogos_data_light_background {
  url: string | null;
}

export interface BrandLogos_prismicLogos_data {
  primary: BrandLogos_prismicLogos_data_primary | null;
  primary_background: BrandLogos_prismicLogos_data_primary_background | null;
  primary_negative: BrandLogos_prismicLogos_data_primary_negative | null;
  light: BrandLogos_prismicLogos_data_light | null;
  light_background: BrandLogos_prismicLogos_data_light_background | null;
}

export interface BrandLogos_prismicLogos {
  data: BrandLogos_prismicLogos_data | null;
}

export interface BrandLogos {
  prismicLogos: BrandLogos_prismicLogos | null;
}
