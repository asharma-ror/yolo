import React, { MouseEventHandler } from "react"
import { Box, Button, TextField } from "@material-ui/core"
import { FieldError } from "react-hook-form"

import GoogleLogin from "../../../ui/molecules/GoogleLogin"
import FacebookLogin from "../../../ui/molecules/FacebookLogin"
import CustomPasswordInput from "../../../ui/molecules/CustomPasswordInput"

interface Props {
  fields: {
    username: {
      name: string
      error: FieldError | undefined
    }
    password: {
      name: string
      error: FieldError | undefined
    }
  }
  handleSubmit?: MouseEventHandler
  register?: any
  socialLoginResponse: (provider: string, response: any) => void
}

const LoginForm = ({
  handleSubmit,
  register,
  fields: { username, password },
  socialLoginResponse,
}: Props) => {
  return (
    <div>
      <Box my={1}>
        <GoogleLogin
          buttonText="Connettiti con Google"
          socialLoginResponse={socialLoginResponse}
        />
      </Box>
      <Box my={1}>
        <FacebookLogin socialLoginResponse={socialLoginResponse} />
      </Box>
      <Box my={2} textAlign="center">
        Oppure
      </Box>
      <Box my={1}>
        <TextField
          name={username.name}
          inputRef={register}
          required
          label="Username"
          variant="outlined"
          size="small"
          fullWidth
          autoComplete="off"
          error={!!username.error}
        />
      </Box>
      <Box my={1}>
        <CustomPasswordInput
          name={password.name}
          register={register}
          required
          label="Password"
          variant="outlined"
          size="small"
          fullWidth
          error={!!password.error}
        />
      </Box>
      <Box my={1}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
        >
          Accedi
        </Button>
      </Box>
    </div>
  )
}

LoginForm.defaultProps = {
  fields: {
    username: {
      name: "username",
    },
    password: {
      name: "password",
    },
  },
  socialLoginResponse: () => {},
}

export default LoginForm
