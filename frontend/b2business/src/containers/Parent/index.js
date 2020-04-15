import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby"
import { PropTypes } from "prop-types"
import React from "react"
import { Helmet } from "react-helmet"
import brand from "../../api/dummy/brand"
import MenuContent from "../../api/ui/menu"
import PapperBlock from "../../components/ui/PapperBlock/PapperBlock"

const styles = {
  link: {
    display: "block",
    textTransform: "capitalize",
  },
  title: {
    margin: "20px 16px 5px",
    textTransform: "uppercase",
    fontSize: 12,
  },
}

class Parent extends React.Component {
  render() {
    const title = brand.name
    const description = brand.desc
    const { classes, history } = this.props
    // Get Path Location
    let parts = history.location.pathname.split("/")
    const place = parts[parts.length - 1]
    parts = parts.slice(1, parts.length - 1)
    const menuItems = MenuContent.find(obj => obj.key === place)
    const getMenus = menuArray =>
      menuArray.map((item, index) => {
        if (item.link) {
          return (
            <Button
              key={index.toString()}
              color="primary"
              component={Link}
              className={classes.link}
              to={item.link}
            >
              {item.name}
            </Button>
          )
        }
        return (
          <Typography
            className={classes.title}
            variant="h6"
            key={index.toString()}
          >
            {item.name}
          </Typography>
        )
      })

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title={place} desc="">
          {menuItems !== undefined && getMenus(menuItems.child, "key")}
        </PapperBlock>
      </div>
    )
  }
}

Parent.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withStyles(styles)(Parent)
