import React from "react"
import { Drawer, makeStyles, Container } from "@material-ui/core"
import headerDrawerStyles from "./styles"
import Logo from "../../atoms/Logo"
import { Link } from "gatsby"
import { CloseFab } from "../../atoms/CustomFab"

interface Props {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
  bottomContent?: React.ReactNode
}

const useStyles = makeStyles(headerDrawerStyles as any)

const HeaderDrawer = ({ open, onClose, children, bottomContent }: Props) => {
  const classes = useStyles()
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={onClose}
    >
      <Container className={classes.container}>
        <div className={classes.controls}>
          <div className={classes.logo}>
            <Link to="/">
              <Logo color="light" />
            </Link>
          </div>
          <div>
            <CloseFab
              color="secondary"
              aria-label="open drawer"
              onClick={onClose}
            />
          </div>
        </div>
        {children ? (
          <div className={classes.content}>{children}</div>
        ) : undefined}
        {bottomContent ? (
          <div className={classes.footerContent}>{bottomContent}</div>
        ) : undefined}
      </Container>
    </Drawer>
  )
}

export default HeaderDrawer
