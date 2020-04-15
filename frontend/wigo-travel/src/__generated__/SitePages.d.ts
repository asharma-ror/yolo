/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SitePages
// ====================================================

export interface SitePages_allSitePage_nodes_context {
  id: string | null;
  source: string | null;
}

export interface SitePages_allSitePage_nodes {
  path: string;
  context: SitePages_allSitePage_nodes_context | null;
}

export interface SitePages_allSitePage {
  nodes: SitePages_allSitePage_nodes[];
}

export interface SitePages {
  allSitePage: SitePages_allSitePage;
}
