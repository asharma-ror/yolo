import React from "react"
import DefaultLayout from "../../components/layouts/default/DefaultLayout"
import ProductBookingInfo from "./components/ProductBookingInfo/ProductBookingInfo"
import ProductDescription from "./components/ProductDescription/ProductDescription"
import Hero from "../../components/ui/organisms/Hero"
import { ProductBySlug_prismicProduct as PrismicProduct } from "../../__generated__/ProductBySlug"
import { toHeroData } from "../../converters/prismic/heroConverter"

interface Props {
  page: PrismicProduct
}

const ProductContainer = ({ page }: Props) => {
  const hero = toHeroData(page.data?.wide?.document)
  return (
    <DefaultLayout headerColor="transparent" headerPosition="fixed">
      {hero ? <Hero data={hero}></Hero> : undefined}
      <ProductBookingInfo product={page} />
      <ProductDescription product={page} />
    </DefaultLayout>
  )
}

export default ProductContainer
