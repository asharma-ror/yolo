import React from "react"
import DefaultLayout from "../components/layouts/default/DefaultLayout"
import SEO from "../components/seo/SEO"

const NotFoundPage = () => (
  <DefaultLayout>
    <SEO title="404: Not found" noIndex />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </DefaultLayout>
)

export default NotFoundPage
