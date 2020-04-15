import * as React from "react"
import { ReactNode } from "react"
import DefaultLayout from "../../components/layouts/default/DefaultLayout"
import DashboardContainer from "../../containers/Pricing/Dashboard/Dashboard"

interface Props {
  children: ReactNode
  location: Location
}

const DashHome = (props: Props) => {
  return (
    <DefaultLayout {...props}>
      <DashboardContainer></DashboardContainer>
    </DefaultLayout>
  )
}

export default DashHome
