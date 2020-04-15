import React from "react"
import { LogosContext } from "../../../../context/contents/logosContext"

interface Props {
  children: React.ReactNode
}

const StaticLogosProvider = ({ children }: Props) => (
  <LogosContext.Provider
    value={{
      primary: {
        default:
          "https://images.prismic.io/yolo-travel/1ad4dc93-958a-476a-8a02-a18a10459f7a_wigo-primary.png?auto=compress,format",
        background:
          "https://images.prismic.io/yolo-travel/657798ea-c610-40ad-838c-77baad561e47_wigo-primary-red-square.png?auto=compress,format",
        negative:
          "https://images.prismic.io/yolo-travel/7d92a889-1926-4a2c-acc0-086b949283a1_wigo-primary-filled.png?auto=compress,format",
      },
      light: {
        default:
          "https://images.prismic.io/yolo-travel/c2ae4585-1683-47f4-a49a-da1e921abe63_wigo-negative.png?auto=compress,format",
        negative: "",
        background:
          "https://images.prismic.io/yolo-travel/54d70b02-c4e1-48f4-8c59-c6b6587ebff4_wigo-negative-back.png?auto=compress,format",
      },
    }}
  >
    {children}
  </LogosContext.Provider>
)

export { StaticLogosProvider }
