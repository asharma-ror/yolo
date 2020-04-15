import React, { MouseEventHandler } from "react"
import { Button, Box } from "@material-ui/core"
import PropTypes from "prop-types"
import { FieldError } from "react-hook-form"

import CustomPasswordInput from "../../../../ui/molecules/CustomPasswordInput"

interface Props {
  fields: {
    newPassword: {
      name: string
      error: FieldError | undefined
    }
  }
  handleSubmit: MouseEventHandler
  register: any
}

const ResetPasswordForm = ({
  register,
  handleSubmit,
  fields: { newPassword },
}: Props) => (
  <>
    <Box my={1}>
      <CustomPasswordInput
        name={newPassword.name}
        register={register}
        required
        label="Password"
        variant="outlined"
        size="small"
        autoComplete="off"
        fullWidth
        error={!!newPassword.error}
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

ResetPasswordForm.propTypes = {
  register: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    name: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
}

export default ResetPasswordForm
