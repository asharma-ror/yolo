import { Container, Typography } from "@material-ui/core"
import React from "react"
import ProductDestination from "../ProductDestination/ProductDestination"
import SlickCarousel from "../../../../components/ui/molecules/SlickCarousel"

interface Props {
  product: any
}

const ProductDescription = ({ product }: Props) => {
  const destinations = product.data.destinations
  return (
    <>
      <Container>
        <Typography variant="h4">Destinazioni possibili</Typography>
        <Typography variant="body1">
          A 7 giorni dalla partenze scoprirai quale tra queste destinazioni ti è
          stata assegnata
        </Typography>
      </Container>
      <Container disableGutters>
        <SlickCarousel
          slidesToShowMd={Math.min(4, destinations.length)}
          slidesToShowSm={Math.min(2, destinations.length)}
          slidesToShowXs={1}
        >
          {destinations.map((item: any) => (
            <div key={item.destination.id}>
              <ProductDestination
                destination={item.destination.document.data}
              />
            </div>
          ))}
        </SlickCarousel>
      </Container>
    </>
  )
}

export default ProductDescription
