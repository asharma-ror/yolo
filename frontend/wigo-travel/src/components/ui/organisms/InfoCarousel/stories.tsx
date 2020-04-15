import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import InfoCarousel from "."
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"
import { loremIpsiumShort } from "../../../../testing/consts"
import { rightSpacing } from "../../../../utils/styleUtils"

const story = storiesOf("Organisms|InfoCarousel", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const data = {
  title: "Come funziona?",
  subtitle: loremIpsiumShort,
  boxes: [
    {
      icon: (
        <img src="https://images.prismic.io/yolo-travel/26746d5d-3698-4a72-90fb-dae8d6198c72_illustration_time.png?auto=compress,format" />
      ),
      title: "Per viaggiare devi essere under 30!",
      body: loremIpsiumShort,
    },
    {
      icon: (
        <img src="https://images.prismic.io/yolo-travel/ca2ca9de-daac-4718-bae6-e9135ec1e2f5_illustration_calendar.png?auto=compress,format" />
      ),
      title: "Fissa una data e prenota",
      body: loremIpsiumShort,
    },
    {
      icon: (
        <img src="https://images.prismic.io/yolo-travel/2c83ae9d-2e9c-4b3e-b6f6-c55ad3e2decd_illustration_pin.png?auto=compress,format" />
      ),
      title: "Scopri la destinazione",
      body: loremIpsiumShort,
    },
    {
      icon: (
        <img src="https://images.prismic.io/yolo-travel/ef2564d5-b617-4fe6-b0f8-f43a4c21446c_illustration_bag.png?auto=compress,format" />
      ),
      title: "Parti con WIGO",
      body: loremIpsiumShort,
    },
  ],
}

story.add("Default", () => <InfoCarousel data={data} />)
story.add("Box Padded", () => (
  <InfoCarousel
    data={data}
    titlePadding={rightSpacing("40%")}
    boxBodyPadding={rightSpacing("20%")}
    boxTitlePadding={rightSpacing("20%")}
  />
))
