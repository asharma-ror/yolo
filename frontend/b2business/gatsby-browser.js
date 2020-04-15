/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import "./src/styles/global.scss"

export { default as wrapRootElement } from "./src/state/ReduxWrapper"

if (typeof window !== "undefined") {
  window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true
}

// https://www.gatsbyjs.org/docs/add-offline-support-with-a-service-worker/
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}

export const registerServiceWorker = () => true
