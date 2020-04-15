interface RouteParams {
  prefix?: string
  urlBuilder?: (node: any) => string
}

const getRouteRefix = (route: RouteParams) =>
  route.prefix ? `/${route.prefix}` : ""

const defaultUrlBuilder = (route: RouteParams, node: any) =>
  `${getRouteRefix(route)}/${node.uid}`

const getCategoryPath = (category: any) =>
  category && category.uid ? `/${category.uid}` : ""

const pageWithCategoryUrlBuilder = (node: any) =>
  `${getCategoryPath(node.data.category)}/${node.uid}`

/* eslint-disable */
const dynamicRoutes: { [id: string]: RouteParams } = {
  default: { prefix: "" },
  product: { prefix: "vacanze" },
  error_page: {
    urlBuilder: (node: any) =>
      `/error/${node.data.category?.uid ?? "generic"}/${node.uid}`,
  },
  landing_page: {
    urlBuilder: (node: any) => pageWithCategoryUrlBuilder(node),
  },
  editorial_page: {
    urlBuilder: (node: any) => pageWithCategoryUrlBuilder(node),
  },
}
/* eslint-enable */

const getRoute = (type: string) => dynamicRoutes[type]

const buildRouteUrl = (route: RouteParams, node: any): string => {
  if (route.prefix !== undefined) {
    return defaultUrlBuilder(route, node)
  }
  if (route.urlBuilder) {
    return route.urlBuilder(node)
  }

  throw new Error(`Invalid route rule -> ${JSON.stringify(route)}`)
}

const createPagePath = (node: any) => {
  const route = getRoute(node.type) ? getRoute(node.type) : getRoute("default")
  const url = buildRouteUrl(route, node)
  return url
}

export { createPagePath }
