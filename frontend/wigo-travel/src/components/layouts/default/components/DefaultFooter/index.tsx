import React from "react"
import Footer from "../../../../ui/organisms/Footer"
import NewsletterBox from "../../../../ui/organisms/NewsletterBox"
import { LayoutContext } from "../../../../../context/contents/defaultLayoutContext"

export default function DefaultFooter() {
  return (
    <LayoutContext.Consumer>
      {(context) => (
        <>
          {context.footer.newsletterBox ? (
            <NewsletterBox data={context.footer.newsletterBox} />
          ) : undefined}

          <Footer
            social={context.footer.social}
            links={context.footer.links}
            company={context.footer.company}
          />
        </>
      )}
    </LayoutContext.Consumer>
  )
}
