import React, { MouseEventHandler } from "react"
import { TextField, Button, Box } from "@material-ui/core"
import PropTypes from "prop-types"
import { FieldError } from "react-hook-form"

interface Props {
  fields: {
    email: {
      name: string
      error: FieldError | undefined
    }
  }
  handleSubmit: MouseEventHandler
  register: any
}

const ForgotPasswordForm = ({
  register,
  handleSubmit,
  fields: { email },
}: Props) => (
  <>
    <Box my={1}>
      <TextField
        name={email.name}
        inputRef={register}
        required
        label="Email Address"
        variant="outlined"
        size="small"
        autoComplete="off"
        fullWidth
        error={!!email.error}
      />
    </Box>
    <Box my={1}>
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
      >
        Reimposta Password
      </Button>
    </Box>
  </>
)

ForgotPasswordForm.propTypes = {
  register: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    name: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
}

export default ForgotPasswordForm
