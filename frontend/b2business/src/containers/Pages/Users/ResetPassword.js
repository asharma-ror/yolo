import { withStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"
import React from "react"
import { Helmet } from "react-helmet"
import brand from "../../../api/dummy/brand"
import ResetForm from "../../../components/ui/Forms/ResetForm"
import styles from "../../../components/ui/Forms/user-jss"

class ResetPassword extends React.Component {
  state = {
    valueForm: [],
  }

  submitForm(values) {
    setTimeout(() => {
      this.setState({ valueForm: values })
      console.log(`You submitted:\n\n${this.state.valueForm}`) // eslint-disable-line
    }, 500) // simulate server latency
  }

  render() {
    const title = brand.name + " - Reset Password"
    const description = brand.desc
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <ResetForm onSubmit={values => this.submitForm(values)} />
          </div>
        </div>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ResetPassword)
