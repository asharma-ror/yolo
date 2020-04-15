import React, { ReactNode } from "react"
import DefaultLayout from "../../components/layouts/default/DefaultLayout"
import ProductListContainer from "../../containers/Products/ProductList/ProductList"

interface Props {
  children: ReactNode
  location: Location
}

const ProductList = (props: Props) => {
  return (
    <DefaultLayout {...props} title="Products">
      <ProductListContainer></ProductListContainer>
    </DefaultLayout>
  )
}

export default ProductList
