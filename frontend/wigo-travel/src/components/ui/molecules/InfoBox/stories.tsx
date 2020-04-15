import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import InfoBox from "."
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"
import { loremIpsium } from "../../../../testing/consts"
import { rightSpacing } from "../../../../utils/styleUtils"

const story = storiesOf("Molecules|InfoBox", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const data = {
  icon: (
    <img src="https://images.prismic.io/yolo-travel/58bd82ef-66c6-410e-b916-57105bac1bf4_filled_illustration_hotel.png?auto=compress,format" />
  ),
  title: "Parti con wigo",
  body: loremIpsium,
}

story.add("Default", () => <InfoBox data={data} />)
story.add("Title padded", () => (
  <InfoBox data={data} titlePadding={rightSpacing("40%")} />
))
story.add("Title Body padded", () => (
  <InfoBox
    data={data}
    titlePadding={rightSpacing("40%")}
    bodyPadding={rightSpacing("20%")}
  />
))
