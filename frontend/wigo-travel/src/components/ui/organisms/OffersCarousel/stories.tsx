import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import OffersCarousel, { OffersGroupData } from "."
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"
import { unsplashImg } from "../../../../testing/mocks/assets/images"
import { Offer } from "../OfferCard"
import { range } from "../../../../utils/arrayUtils"

const story = storiesOf("Organisms|OffersCarousel", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const offers: OffersGroupData = {
  title: "Offerte",
  items: range(0, 3).map(
    () =>
      ({
        title: "Sardegna",
        subtitle: "Porto Torres",
        description:
          "Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
        treatment: {
          name: "Tutto incluso",
        },
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
      } as Offer)
  ),
}

story.add("Default", () => <OffersCarousel data={offers} />)
