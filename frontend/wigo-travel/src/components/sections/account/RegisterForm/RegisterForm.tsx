import React, { MouseEventHandler } from "react"
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, TextField, Theme, Grid } from "@material-ui/core"
import { FieldError } from "react-hook-form"
import { makeStyles } from "@material-ui/styles"
import CustomPasswordInput from "../../../ui/molecules/CustomPasswordInput"
import CustomBirthdayPicker from "../../../ui/molecules/CustomBirthdayPicker"

const useStyles = makeStyles((theme: Theme) => ({
  google: {
    backgroundColor: "#dd4b39",
    color: theme.palette.common.white,
    width: "100%",

    "&:hover,&:focus": {
      backgroundColor: "#dd4b39",
      color: theme.palette.common.white,
    },
  },
  facebook: {
    backgroundColor: "#3b5998",
    color: theme.palette.common.white,
    width: "100%",

    "&:hover,&:focus": {
      backgroundColor: "#3b5998",
      color: theme.palette.common.white,
    },
  },
  icon: {
    marginRight: 10,
  },
}))

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
    email: {
      name: string
      error: FieldError | undefined
    }
    firstName: {
      name: string
      error: FieldError | undefined
    }
    lastName: {
      name: string
      error: FieldError | undefined
    }
    birthday: {
      name: string
      error: FieldError | undefined
    }
  }
  handleSubmit: MouseEventHandler
  register: any
}

const LoginForm = ({
  handleSubmit,
  register,
  fields: { username, password, email, firstName, lastName, birthday },
}: Props) => {
  const classes = useStyles()
  return (
    <div>
      <Box my={1}>
        <Button variant="contained" className={classes.google}>
          <FontAwesomeIcon icon={faGoogle} className={classes.icon} />
          {"Registrati con Google"}
        </Button>
      </Box>
      <Box my={1}>
        <Button variant="contained" className={classes.facebook}>
          <FontAwesomeIcon icon={faFacebookF} className={classes.icon} />
          {"Registrati con Facebook"}
        </Button>
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name={firstName.name}
            inputRef={register}
            label="Nome"
            variant="outlined"
            required
            size="small"
            fullWidth
            autoComplete="off"
            error={!!firstName.error}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name={lastName.name}
            inputRef={register}
            label="Cognome"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            error={!!lastName.error}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomBirthdayPicker
            inputName={birthday.name}
            inputRef={register}
            label="Nome"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            required
            error={!!birthday.error}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name={email.name}
            inputRef={register}
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            error={!!email.error}
          />
        </Grid>
      </Grid>
      <Box my={1}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
        >
          Registrati
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
    socialOptions: {
      facebook: {
        label: "Connettiti con Facebook",
      },
      google: {
        label: "Connettiti con Google",
      },
    },
  },
}

export default LoginForm
