/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CommonIcons
// ====================================================

export interface CommonIcons_prismicCommonIcons_data_product_ranking {
  url: string | null;
}

export interface CommonIcons_prismicCommonIcons_data_product_star {
  url: string | null;
}

export interface CommonIcons_prismicCommonIcons_data_product_treatment {
  url: string | null;
}

export interface CommonIcons_prismicCommonIcons_data {
  product_ranking: CommonIcons_prismicCommonIcons_data_product_ranking | null;
  product_star: CommonIcons_prismicCommonIcons_data_product_star | null;
  product_treatment: CommonIcons_prismicCommonIcons_data_product_treatment | null;
}

export interface CommonIcons_prismicCommonIcons {
  data: CommonIcons_prismicCommonIcons_data | null;
}

export interface CommonIcons {
  prismicCommonIcons: CommonIcons_prismicCommonIcons | null;
}
