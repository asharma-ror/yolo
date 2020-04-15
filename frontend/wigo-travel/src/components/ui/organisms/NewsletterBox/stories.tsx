import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import NewsletterBox from "."
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import { NewsletterBoxData } from "../../../../types/contents"

const story = storiesOf("Organisms|NewsletterBox", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)

const data: NewsletterBoxData = {
  cta: {
    placeholder: "Inserisci il tuo indirizzo email",
    label: "CONFERMA",
  },
  title: "Non perderti nemmeno un viaggio!",
  disclaimer:
    "By signing up to our newsletter you agree to our Terms and Conditions and that you have read our Privacy Policy, including our Cookie use.",
  subscribedMessage: "Grazie per esserti registrato",
}

story.add("Default", () => <NewsletterBox data={data} />)
