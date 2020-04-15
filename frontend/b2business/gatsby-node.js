exports.createPages = ({ actions }) => {
  actions.createRedirect({
    fromPath: `/`,
    toPath: `/pricing/dashboard`,
    redirectInBrowser: `true`,
  })
}
