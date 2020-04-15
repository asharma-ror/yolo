import { action } from "@storybook/addon-actions"
import "../src/styles/global.css"
import "./preview/styles.css"

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
// window.___navigate = pathname => {
//   action("NavigateTo:")(pathname)
// }

// import { addDecorator, configure } from "@storybook/react"
// import { withOptions } from "@storybook/addon-options"

// const req = require.context("../src", true, /.stories.tsx$/)

// const loadStories = () => req.keys().forEach(filename => req(filename))

// // If you'd like to add global styles to all stories, modify this component.
// // addDecorator(GlobalStyleDecorator);

// configure(loadStories, module)
