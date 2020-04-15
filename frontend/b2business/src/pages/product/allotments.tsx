import React, { ReactNode } from "react"
import DefaultLayout from "../../components/layouts/default/DefaultLayout"
import ProductAllotmentsContainer from "../../containers/Products/ProductAllotments/ProductAllotments"

interface Props {
  children: ReactNode
  location: Location
}

const ProductsAllotments = (props: Props) => {
  return (
    <DefaultLayout {...props}>
      <ProductAllotmentsContainer></ProductAllotmentsContainer>
    </DefaultLayout>
  )
}

export default ProductsAllotments
