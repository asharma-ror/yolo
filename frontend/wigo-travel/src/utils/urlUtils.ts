import * as queryString from "query-string"
import { WindowLocation } from "@reach/router"

export const getQueryParam = (
  location: WindowLocation | undefined,
  name: string
): string =>
  location ? (queryString.parse(location.search)[name] as string) : ""
