import {
  DefaultLayoutContents_prismicStandardFooter as DefaultLayoutContentsPrismicStandardFooter,
  DefaultLayoutContents_prismicStandardFooterBodySocialLinks as DefaultLayoutContentsPrismicStandardFooterBodySocialLinks,
} from "../../__generated__/DefaultLayoutContents"
import { FooterData } from "../../types/contents"

export const toFooter = (
  footer: DefaultLayoutContentsPrismicStandardFooter,
  footerSocialLinks: DefaultLayoutContentsPrismicStandardFooterBodySocialLinks
): FooterData => ({
  newsletterBox: {
    title: footer.data?.newsletter_box_title,
    disclaimer: footer.data?.newsletter_box_disclaimer,
    subscribedMessage: footer.data?.newsletter_subscribed_message,
    cta: {
      placeholder: footer.data?.newsletter_input_placeholder?.text ?? "",
      label: footer.data?.newsletter_input_cta_text?.text ?? "",
    },
  },
  company: {
    name: footer.data?.company_name,
    info: footer.data?.company_info,
  },
  links: {
    items:
      footer.data?.body1?.[0]?.items?.map((x) => ({
        label: x?.link_title?.text,
        link: x?.link_address,
      })) ?? [],
  },
  social: {
    title: footerSocialLinks.primary?.title,
    links:
      footerSocialLinks.items?.map((x) => ({
        icon: x?.icon,
        url: x?.url?.url ?? "",
      })) ?? [],
  },
})
