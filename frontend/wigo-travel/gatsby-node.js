//source: https://gist.github.com/clarkdave/53cc050fa58d9a70418f8a76982dd6c8

"use strict"

require("source-map-support").install()
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
})

exports.createPages = require("./src/routing/create-pages").createPages
exports.onCreatePage = require("./src/routing/create-page").createPage
