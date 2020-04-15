import React from "react"
import { fakeValturAllotments } from "../../../api/products/allotments"
import PapperBlock from "../../../components/ui/PapperBlock/PapperBlock"
import AllotmentsTable from "./components/AllotmentsTable/AllotmentsTable"

interface Props {}

const ProductAllotmentsContainer = ({}: Props) => {
  const data = fakeValturAllotments
  return (
    <>
      <PapperBlock
        noMargin
        title="Allocations"
        desc=""
        icon="ios-calendar-outline"
        whiteBg
      >
        {/* <AllotmentsFilterToolbar data={data}></AllotmentsFilterToolbar> */}
        <AllotmentsTable data={data}></AllotmentsTable>
      </PapperBlock>
    </>
  )
}

export default ProductAllotmentsContainer
