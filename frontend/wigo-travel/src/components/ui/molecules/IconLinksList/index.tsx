import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core"
import CustomContainer from "../../atoms/CustomContainer"

interface LinkData {
  icon: React.ReactNode
  url: string
  target: string
}

interface Props {
  title?: React.ReactNode
  links: LinkData[]
}

const useStyles = makeStyles((theme) => ({
  linksContainer: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  link: {
    padding: theme.spacing(1, 2),
  },
}))

const IconsLinkList = ({ title, links }: Props) => {
  const classes = useStyles()
  return (
    <CustomContainer>
      <div>{title}</div>
      <div className={classes.linksContainer}>
        {links.map((x, index) => (
          <div className={classes.link} key={index}>
            <Link to={x.url} target={x.target}>
              {x.icon}
            </Link>
          </div>
        ))}
      </div>
    </CustomContainer>
  )
}

export default IconsLinkList
