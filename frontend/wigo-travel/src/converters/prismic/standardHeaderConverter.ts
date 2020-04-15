import { HeaderData } from "../../types/contents"
import { DefaultLayoutContents_prismicStandardHeader as DefaultLayoutContentsPrismicStandardHeader } from "../../__generated__/DefaultLayoutContents"

export const toHeader = (
  header: DefaultLayoutContentsPrismicStandardHeader
): HeaderData => ({
  labels: {
    loginMenuName: header.data?.login_menu_name?.text ?? "",
  },
  links: header.data?.body?.[0]?.items ?? [],
})
