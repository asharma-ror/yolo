import React from "react"
import { fakeValturProducts } from "../../../api/products/allotments"
import PapperBlock from "../../../components/ui/PapperBlock/PapperBlock"
import ProductListTable from "./components/ProductListTable/ProductListTable"

interface Props {}

const ProductListContainer = ({}: Props) => {
  const data = fakeValturProducts
  return (
    <>
      <PapperBlock
        noMargin
        title="Products List"
        desc=""
        icon="ios-calendar-outline"
        whiteBg
      >
        <ProductListTable data={data}></ProductListTable>
      </PapperBlock>
    </>
  )
}

export default ProductListContainer
