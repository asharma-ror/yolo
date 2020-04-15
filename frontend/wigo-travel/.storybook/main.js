module.exports = {
  stories: ["../src/components/**/*(.)?stories.tsx"],
  addons: [
    "@storybook/addon-options/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-links/register",
    "@storybook/addon-viewport/register",
    "@storybook/addon-a11y/register",
  ],
}
