import React, { ReactNode } from "react"
import DefaultLayout from "../../components/layouts/default/DefaultLayout"
import PricingDetailsContainer from "../../containers/Pricing/Details/Details"

interface Props {
  children: ReactNode
  location: Location
}

const DetailsPage = (props: Props) => {
  return (
    <DefaultLayout {...props}>
      <PricingDetailsContainer></PricingDetailsContainer>
    </DefaultLayout>
  )
}

export default DetailsPage
