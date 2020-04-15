import React from "react"
import { IconsContext } from "../../../../context/contents/iconsContext"

interface Props {
  children: React.ReactNode
}

const StaticIconsProvider = ({ children }: Props) => (
  <IconsContext.Provider
    value={{
      product: {
        ranking:
          "https://images.prismic.io/yolo-travel/486bedfa-c4a7-4ea9-b320-6caece2fdebb_award.png?auto=compress,format",
        star:
          "https://images.prismic.io/yolo-travel/59d612f8-6216-4d59-9346-e98f49b483e7_Star.png?auto=compress,format",
        treatment:
          "https://images.prismic.io/yolo-travel/c8f162f8-6d29-499b-977b-e707c1566692_zap.png?auto=compress,format",
      },
    }}
  >
    {children}
  </IconsContext.Provider>
)

export { StaticIconsProvider }
