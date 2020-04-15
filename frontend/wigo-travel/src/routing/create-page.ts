import { GatsbyCreatePage } from "./types"

export const createPage: GatsbyCreatePage = async ({ page, actions }: any) => {
  const { createPage } = actions
  // Only update the `/checkout` page.
  if (page.path.match(/^\/checkout/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/checkout/*"
    // Update the page.
    createPage(page)
  }
}
