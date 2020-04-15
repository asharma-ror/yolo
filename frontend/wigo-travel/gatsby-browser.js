// import "swiper/dist/css/swiper.css"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import "./src/styles/global.css"
import * as Sentry from "@sentry/browser"

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// https://www.gatsbyjs.org/docs/add-offline-support-with-a-service-worker/
export const onServiceWorkerUpdateReady = () => {
  // const answer = window.confirm(
  //   `This application has been updated. ` +
  //     `Reload to display the latest version?`
  // )
  // if (answer === true) {
  window.location.reload()
  //}
}

export const registerServiceWorker = () => true

// export const onClientEntry = () => {
//   // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
//   if (!(`IntersectionObserver` in window)) {
//     import(`intersection-observer`)
//     console.log(`# IntersectionObserver is polyfilled!`)
//   }
// }
export { wrapRootElement } from "./src/wrapRoot"

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
  })
}
