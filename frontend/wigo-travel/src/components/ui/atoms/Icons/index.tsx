import React from "react"
import { IconsContext, Icons } from "../../../../context/contents/iconsContext"

interface Props {
  className?: string
  selector: (context: Icons) => string
}

const Icon = ({ selector, className }: Props) => {
  return (
    <IconsContext.Consumer>
      {(context) => <img className={className} src={selector(context)} />}
    </IconsContext.Consumer>
  )
}

interface IconProps {
  className?: string
}

export const Star = ({ className }: IconProps) => (
  <Icon className={className} selector={(x) => x.product.star} />
)
export const Ranking = ({ className }: IconProps) => (
  <Icon className={className} selector={(x) => x.product.ranking} />
)
export const Treatment = ({ className }: IconProps) => (
  <Icon className={className} selector={(x) => x.product.treatment} />
)
