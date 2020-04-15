import React from "react"
import { Link } from "gatsby"
import { SitePagesContext } from "../../../../../context/contents/sitePagesContext"

interface LinkFieldProps {
  value: any
  className?: any
  children?: any
}

const InternalLink = ({ value, className, children }: LinkFieldProps) => {
  return (
    <SitePagesContext.Consumer>
      {(context) => {
        const page = context.find((x) => x.id === value.id)
        return (
          <>
            {page ? (
              <Link to={page.path} className={className}>
                {children}
              </Link>
            ) : undefined}
          </>
        )
      }}
    </SitePagesContext.Consumer>
  )
}
const ExternalLink = ({ value, className, children }: LinkFieldProps) => {
  return (
    <a className={className} href={value.url} target={value.target}>
      {children}
    </a>
  )
}

const LinkField = ({ value, className, children }: LinkFieldProps) => {
  if (!value) {
    return <></>
  }
  switch (value.link_type?.toLowerCase()) {
    case "document":
      return (
        <InternalLink value={value} className={className}>
          {children}
        </InternalLink>
      )
    case "media":
    case "web":
      return (
        <ExternalLink value={value} className={className}>
          {children}
        </ExternalLink>
      )
    default:
      return <></>
  }
}

export { LinkField }
