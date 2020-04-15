import React from "react"
import { fakePricingDetailsRecords } from "../../../api/pricing/fakeData"
import { PricingDetailsRecord } from "../../../api/pricing/types"
import PapperBlock from "../../../components/ui/PapperBlock/PapperBlock"
import PricingDetailsFilters from "./components/PricingDetailsFilters/PricingDetailsFilters"
import PricingDetailsTable from "./components/PricingDetailsTable/PricingDetailsTable"

interface Props {}

const PricingDetailsContainer = ({}: Props) => {
  const data: PricingDetailsRecord[] = fakePricingDetailsRecords
  return (
    <>
      <PapperBlock
        noMargin
        title="Pricing Details"
        desc=""
        icon="ios-cash-outline"
        whiteBg
      >
        <PricingDetailsFilters></PricingDetailsFilters>
        <PricingDetailsTable data={data}></PricingDetailsTable>
      </PapperBlock>
    </>
  )
}

export default PricingDetailsContainer
