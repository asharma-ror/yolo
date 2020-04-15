import React from "react"
import BackgroundImage from "gatsby-background-image"
import Img from "gatsby-image"

export type ImageSize = "fixed" | "fluid"

interface Props {
  value: any
  background?: boolean
  className?: string
  tag?: string
  children?: React.ReactNode
  size?: ImageSize
}

type ImageType = "gatsby" | "html"

const getImageType = (value: any): ImageType | undefined => {
  if (value.src || value.url || typeof value === "string") {
    return "html"
  }

  if (value.childImageSharp || value.fixed || value.fluid) {
    return "gatsby"
  }
}

const renderGatsbyImage = (
  value: any,
  background: boolean,
  className?: string,
  tag?: string,
  size?: ImageSize,
  children?: any
) => {
  const imageValue = value.childImageSharp ?? value
  if ((size === undefined || size === "fixed") && imageValue.fixed) {
    return background ? (
      <BackgroundImage
        className={className}
        fixed={imageValue.fixed}
        Tag={tag as any}
      >
        {children}
      </BackgroundImage>
    ) : (
      <Img className={className} fixed={imageValue.fixed} />
    )
  }

  if ((size === undefined || size === "fluid") && imageValue.fluid) {
    return background ? (
      <BackgroundImage
        className={className}
        fluid={imageValue.fluid}
        Tag={tag as any}
      >
        {children}
      </BackgroundImage>
    ) : (
      <Img className={className} fluid={imageValue.fluid} />
    )
  }

  console.error(
    `Invalid gatsby image -> size: ${size} -> image: ${JSON.stringify(value)}`
  )
}

const backgroundImgStyle = (
  src: string,
  size?: ImageSize
): React.CSSProperties => {
  return {
    backgroundImage: `url(${src})`,
    backgroundSize: size === "fixed" ? "contain" : "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "center",
  }
}

const renderHtmlImage = (
  value: any,
  background: boolean,
  className?: string,
  size?: ImageSize,
  children?: any
) => {
  const src = value.src ?? value.url ?? value
  return background ? (
    <section style={backgroundImgStyle(src)} className={className}>
      {children}
    </section>
  ) : (
    <img
      className={className}
      src={src}
      width={size === "fluid" ? "100%" : ""}
    />
  )
}

const renderImage = (
  value: any,
  background: boolean,
  className?: string,
  tag?: string,
  size?: ImageSize,
  children?: any
) => {
  if (children && !background) {
    console.error("Non background images cannot have children content")
    return undefined
  }
  if (!value) {
    return undefined
  }
  const imageType = getImageType(value)
  switch (imageType) {
    case "gatsby":
      return renderGatsbyImage(
        value,
        background,
        className,
        tag,
        size,
        children
      )
    case "html":
      return renderHtmlImage(value, background, className, size, children)
    default:
      console.error("Invalid image type", imageType)
      return undefined
  }
}

const ImageField = ({
  value,
  background,
  className,
  tag,
  size,
  children,
}: Props) => (
  <>{renderImage(value, background ?? false, className, tag, size, children)}</>
)

ImageField.defaultProps = {
  background: false,
}

export { ImageField }
