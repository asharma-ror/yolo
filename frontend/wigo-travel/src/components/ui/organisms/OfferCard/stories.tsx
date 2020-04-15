import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import OfferCard, { Offer } from "."
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"
import { unsplashImg } from "../../../../testing/mocks/assets/images"

const story = storiesOf("Organisms|OfferCard", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const offer: Offer = {
  title: "Sardegna",
  subtitle: "Porto Torres",
  description:
    "Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
  treatment: { name: "Tutto incluso" },
  price: {
    prefix: "da",
    value: "500€",
  },
  image: unsplashImg("nXOB-wh4Oyc"),
  ranking: {
    value: 4.2,
    label: "Stelle",
  },
  cta: {
    label: "Scopri",
    link: "/my-offer",
  },
}

story.add("Default", () => <OfferCard data={offer} />)
