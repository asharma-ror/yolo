/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Sitemap
// ====================================================

export interface Sitemap_prismicSitemap_data_title {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface Sitemap_prismicSitemap_data_content {
  /**
   * The HTML value of the text using `prismic-dom` and the HTML serializer.
   */
  html: string | null;
}

export interface Sitemap_prismicSitemap_data_body_primary_seo_description {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface Sitemap_prismicSitemap_data_body_primary_seo_title {
  /**
   * The plain text value of the text using `prismic-dom`.
   */
  text: string | null;
}

export interface Sitemap_prismicSitemap_data_body_primary {
  seo_no_index: boolean | null;
  seo_no_follow: boolean | null;
  seo_description: Sitemap_prismicSitemap_data_body_primary_seo_description | null;
  seo_title: Sitemap_prismicSitemap_data_body_primary_seo_title | null;
}

export interface Sitemap_prismicSitemap_data_body {
  id: string;
  slice_type: string;
  primary: Sitemap_prismicSitemap_data_body_primary | null;
}

export interface Sitemap_prismicSitemap_data {
  title: Sitemap_prismicSitemap_data_title | null;
  content: Sitemap_prismicSitemap_data_content | null;
  body: (Sitemap_prismicSitemap_data_body | null)[] | null;
}

export interface Sitemap_prismicSitemap {
  data: Sitemap_prismicSitemap_data | null;
}

export interface Sitemap {
  prismicSitemap: Sitemap_prismicSitemap | null;
}
