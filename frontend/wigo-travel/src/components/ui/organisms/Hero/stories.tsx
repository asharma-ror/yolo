import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import { action } from "@storybook/addon-actions"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import Hero, { HeroData } from "."
import { unsplashImg } from "../../../../testing/mocks/assets/images"

const story = storiesOf("Organisms|Hero", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)

const data: HeroData = {
  backgroundImage: unsplashImg("2ueUnL4CkV8"),
  title: "Where I go, Where WIGO",
  subtitle: "Fatti stupire, viaggia con noi a prezzi e destinazioni mai viste!",
  cta: {
    label: "Parti subito",
    action: action("CTA Click"),
  },
  layout: {},
}

story.add("Centered", () => <Hero data={data} />)
story.add("Align Left", () => (
  <Hero
    data={{
      ...data,
      layout: { titleStyle: "alignLeft", subtitleStyle: "alignLeft" },
    }}
  />
))
story.add("Align Right", () => (
  <Hero
    data={{
      ...data,
      layout: { titleStyle: "alignRight", subtitleStyle: "alignRight" },
    }}
  />
))
story.add("Column Left", () => (
  <Hero
    data={{
      ...data,
      layout: { titleStyle: "leftColumn", subtitleStyle: "leftColumn" },
    }}
  />
))
story.add("Column Right", () => (
  <Hero
    data={{
      ...data,
      layout: { titleStyle: "rightColumn", subtitleStyle: "rightColumn" },
    }}
  />
))
