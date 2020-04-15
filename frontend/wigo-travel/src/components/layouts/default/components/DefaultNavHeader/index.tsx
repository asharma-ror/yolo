import { List, Typography, ListItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import Header, { HeaderColor } from "../../../../ui/organisms/Header"
import Logo from "../../../../ui/atoms/Logo"
import { Link } from "gatsby"
import Stroke from "../../../../ui/atoms/Stroke"
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined"
import { LinkField } from "../../../../ui/molecules/Fields"
import { LayoutContext } from "../../../../../context/contents/defaultLayoutContext"

const useStyles = makeStyles((theme) => ({
  mobileLinks: {
    marginLeft: "auto",
  },
  mobileLink: {
    color: theme.palette.common.white,
  },
  mobileBottom: {
    paddingBottom: theme.spacing(4),
  },
  mobileProfileLink: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    color: theme.palette.common.white,
  },
  mobileProfileLinkName: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(2),
  },
}))

const getBrandLogo = (color: HeaderColor) => {
  switch (color) {
    case "white":
      return <Logo color="primary" width={66} />
    default:
      return <Logo color="light" width={66} />
  }
}

export type HeaderPosition = "default" | "absolute" | "fixed"

interface Props {
  position?: HeaderPosition
  color?: HeaderColor
  colorScrolled?: HeaderColor
  hideBrandWhenSm: boolean
  customSmHeaderControl?: React.ReactNode
}

const defaultProps = {
  position: "absolute" as HeaderPosition,
  color: "primary" as HeaderColor,
  colorScrolled: "primary" as HeaderColor,
}

const DefaultNavHeader = ({
  position = defaultProps.position,
  color = defaultProps.color,
  colorScrolled = defaultProps.colorScrolled,
  hideBrandWhenSm,
  customSmHeaderControl,
}: Props) => {
  const classes = useStyles()
  const isHeaderFixed = () => position === "fixed"
  const isHeaderAbsolute = () => position === "absolute"

  return (
    <LayoutContext.Consumer>
      {(context) => (
        <Header
          absolute={isHeaderAbsolute()}
          fixed={isHeaderFixed()}
          brand={getBrandLogo(color)}
          brandScrolled={
            isHeaderFixed() ? getBrandLogo(colorScrolled) : undefined
          }
          color={color}
          hideBrandWhenSm={hideBrandWhenSm}
          changeColorOnScroll={
            isHeaderFixed()
              ? {
                  height: 200,
                  color: colorScrolled,
                }
              : undefined
          }
          customSmHeaderControl={customSmHeaderControl}
          desktopLinksContent={<>desktop links</>}
          mobileLinksContent={
            <List className={classes.mobileLinks}>
              {context.header.links.map((x, index) => (
                <ListItem key={index}>
                  <Typography variant="h2" className={classes.mobileLink}>
                    <LinkField value={x.link}>{x.name?.text}</LinkField>
                  </Typography>
                </ListItem>
              ))}
            </List>
          }
          mobileBottomContent={
            <div className={classes.mobileBottom}>
              <Stroke color="white" />
              <Link to="/account/login" className={classes.mobileProfileLink}>
                <AccountCircleOutlinedIcon />
                <Typography
                  variant="h5"
                  className={classes.mobileProfileLinkName}
                >
                  {context.header.labels.loginMenuName}
                </Typography>
              </Link>
            </div>
          }
        />
      )}
    </LayoutContext.Consumer>
  )
}

export default DefaultNavHeader
